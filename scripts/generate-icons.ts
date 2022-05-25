import axios from "axios";
import { config } from "dotenv";
import {
    existsSync,
    mkdirSync,
    readdirSync,
    rmSync,
    writeFileSync,
} from "fs";
import path from "path";

config();

const figmaApiClient = axios.create({
    baseURL: `https://api.figma.com/v1`,
    headers: {
        "X-Figma-Token": process.env.FIGMA_ACCESS_TOKEN,
    },
});

const IDS_MAX_LENGTH = 2_048;

interface FigmaMetaData {
  id: string;
  name: string;
}

interface SvgMetaData {
  name: string;
  imageUrl: string;
}

interface FetchFigmaDesignOptions {
  fileKey: string;
  containerId: string;
}

interface BuildConfig extends FetchFigmaDesignOptions {
  componentOutPath: string;
  svgOutPath: string;
}

interface ComponentCodeOptions {
    svgName: string;
    fileName: string;
    iconName: string;
}

const fetchSvgIds = async (options: FetchFigmaDesignOptions): Promise<FigmaMetaData[]> => {
    const iconMetaData = (await figmaApiClient.get(`files/${options.fileKey}/nodes?ids=${options.containerId}`)).data;
    return iconMetaData.nodes[options.containerId].document.children.map(({ id, name }: FigmaMetaData) => ({
        id,
        name,
    }));
};

const fetchSvgLinks = async (options: FetchFigmaDesignOptions): Promise<SvgMetaData[]> => {
    const figmaMetaData = await fetchSvgIds(options);
    const staticQueryParams = `format=svg&ids=`;
    const idsMaxLength = IDS_MAX_LENGTH - staticQueryParams.length;

    return (await Promise.all(figmaMetaData
        .reduce((groupedBatchedFigmaMetaData, metaData, i, arr) => {
            const currentBatch = groupedBatchedFigmaMetaData[groupedBatchedFigmaMetaData.length - 1];
            const metaData_ = {
                id: metaData.id,
                name: metaData.name,
            };
            const updatedBatch = [ ...currentBatch, metaData_ ];
            if ((metaData.id.length + currentBatch.join(`,`).length) >= idsMaxLength) {
                return [ ...groupedBatchedFigmaMetaData, [ metaData_ ] ];
            }
            return [ ...groupedBatchedFigmaMetaData.slice(0, -1), updatedBatch ];
        }, [ [] ] as FigmaMetaData[][])
        .map(async (groupedBatchedFigmaMetaData, i, arr) => {
            const batchedIds = groupedBatchedFigmaMetaData.map((metaData) => metaData.id);
            const batchedSvgLinks = (await figmaApiClient.get(`images/${options.fileKey}?${staticQueryParams}${batchedIds.join(`,`)}`)).data.images as Record<string, string>;
            return groupedBatchedFigmaMetaData.map((metaData) => ({
                name: metaData.name,
                imageUrl: batchedSvgLinks[metaData.id],
            }));
        })))
        .flat(1);
};

const createSvgIconFiles = async (options: BuildConfig) => {
    const svgDirName = options.svgOutPath;
    const svgsMetaData = await fetchSvgLinks(options);
    if (!existsSync(svgDirName)) mkdirSync(svgDirName, {
        recursive: true,
    });
    return Promise.all(svgsMetaData.map(async (metaData) => {
        const svg = (await axios.get(metaData.imageUrl)).data;
        writeFileSync(`${svgDirName}/${metaData.name}.svg`, svg);
    }));
};

const fileNameToSvgName = (fileName: string) => {
    const name = fileName.split(`.`)[0];
    return `${name}Svg`;
};

const fileNameToIconName = (fileName: string) => {
    const name = fileName.split(`.`)[0];
    return `${name}Icon`;
};

const createJSXIcons = (options: BuildConfig) => {
    const svgDirName = options.svgOutPath;
    const componentDirName = options.componentOutPath;
    const fileNames = readdirSync(svgDirName);
    if (!existsSync(componentDirName)) mkdirSync(componentDirName, {
        recursive: true,
    });
    // create icons
    for (const fileName of fileNames) {
        const svgName = fileNameToSvgName(fileName);
        const iconName = fileNameToIconName(fileName);
        const componentCode = createComponentCode({
            fileName,
            iconName,
            svgName,
        });
        writeFileSync(`${componentDirName}/${iconName}.tsx`, componentCode);
    }
    // create exporter
    const exporterCode = createExporterComponent(fileNames);
    writeFileSync(`${componentDirName}/index.ts`, exporterCode);
};

const createComponentCode = (options: ComponentCodeOptions) => {
    return `import { ReactComponent } from "./svg/${options.fileName}";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon,
{ SvgIconProps } from "@mui/material/SvgIcon";

const ${options.iconName}: React.VFC<SvgIconProps> = (props) => {
    return (
        <SvgIcon
            {...props}
            component={ReactComponent}
        />
    );
};

export default ${options.iconName} as SvgIconComponent;
`;
};

const createExporterComponent = (fileNames: string[]) => {
    return `${fileNames.map((fileName) => {
        const iconName = fileNameToIconName(fileName);
        return `export { default as ${iconName} } from "./${iconName}";`;
    }).join(`\n`)}\n`;
};

const removeOldFiles = (config: BuildConfig) => {
    const files = readdirSync(config.componentOutPath);
    const whitelistedFiles = [ `Icons.stories.tsx` ];
    files.forEach((file) => {
        if (whitelistedFiles.includes(file)) return;
        const fileDir = path.join(config.componentOutPath, file);
        rmSync(fileDir, {
            recursive: true,
            force: true,
        });
    });
};

const main = async (config: BuildConfig) => {
    removeOldFiles(config);
    await createSvgIconFiles(config);
    createJSXIcons(config);
};

main({
    containerId: process.env.FIGMA_ICON_CONTAINER,
    fileKey: process.env.FIGMA_ICON_FILE_KEY,
    componentOutPath: `src/icons`,
    svgOutPath: `src/icons/svg`,
});
