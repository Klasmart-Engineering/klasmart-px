exports.id=1987,exports.ids=[1987],exports.modules={1987:function(e,t,i){e.exports=function(e){"use strict";var t=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(e);function i(e){return e%10<5&&e%10>1&&~~(e/10)%10!=1}function r(e,t,r){var a=e+" ";switch(r){case"m":return t?"minuta":"minutę";case"mm":return a+(i(e)?"minuty":"minut");case"h":return t?"godzina":"godzinę";case"hh":return a+(i(e)?"godziny":"godzin");case"MM":return a+(i(e)?"miesiące":"miesięcy");case"yy":return a+(i(e)?"lata":"lat")}}var a="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),_="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),n=/D MMMM/,s=function(e,t){return n.test(t)?a[e.month()]:_[e.month()]};s.s=_,s.f=a;var o={name:"pl",weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_śr_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),months:s,monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),ordinal:function(e){return e+"."},weekStart:1,yearStart:4,relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:r,mm:r,h:r,hh:r,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:r,y:"rok",yy:r},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"}};return t.default.locale(o,null,!0),o}(i(8349))}};