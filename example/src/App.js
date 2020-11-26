import logo from './logo.svg';
import './App.css';
import { CenterAlignChildren, CircularProgressWithLabel, ContentCard, Copyright, Loading, utils } from 'kidsloop-px'
import { Grid } from '@material-ui/core';
import { Close as CloseIcon, Edit as EditIcon, Send as SendIcon } from '@material-ui/icons';
import { useState } from 'react';

function App() {
  const [ checkedA, setCheckedA ] = useState(false)
  const [ checkedB, setCheckedB ] = useState(false)
  const [ checkedC, setCheckedC ] = useState(false)
  return (
    <div className="App">
      <header>
        <CenterAlignChildren style={{display: `flex`, width: `100%`, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <CircularProgressWithLabel />
          <img src={logo} className="App-logo" alt="logo" />
          <CircularProgressWithLabel />
        </CenterAlignChildren>
      </header>
      <main>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <ContentCard
              author="Sven"
              description="Description 1"
              imageUrl="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
              title="Title 1"
              assetType="lessonPlan"
              onClick={async () => {
                console.log('start')
                await utils.sleep(2000)
                console.log('finish')
              }}
              actions={[
                {label: `Send`, onClick: () => {console.log(`send`)}, icon: <SendIcon />}
              ]}
              checkbox={{
                checked: checkedA,
                onChange: () => setCheckedA(!checkedA),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <ContentCard
              author="Hubert"
              description="Description 2"
              imageUrl="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
              title="Title 2"
              assetType="lessonMaterial"
              onClick={async () => {
                console.log('start')
                await utils.sleep(2000)
                console.log('finish')
              }}
              actions={[
                {label: `Edit`, onClick: () => {console.log(`edit`)}, icon: <EditIcon />},
                {label: `Close`, onClick: () => {console.log(`close`)}, icon: <CloseIcon />},
              ]}
              checkbox={{
                checked: checkedB,
                onChange: () => setCheckedB(!checkedB),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <ContentCard
              author="Nils"
              description="Description 3"
              imageUrl="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
              title="Title 3"
              assetType="lessonMaterial"
              onClick={async () => {
                console.log('start')
                await utils.sleep(2000)
                console.log('finish')
              }}
              checkbox={{
                checked: checkedC,
                onChange: () => setCheckedC(!checkedC),
              }}
            />
          </Grid>
        </Grid>
      </main>
      <footer>
        <CenterAlignChildren>
          <Loading />
          <Loading />
          <Copyright />
          <Loading />
          <Loading />
        </CenterAlignChildren>
      </footer>
    </div>
  );
}

export default App;
