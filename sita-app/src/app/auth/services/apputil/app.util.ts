declare var numeral: any;
declare var moment: any;
declare var jQuery: any;

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const PREM_FORMAT = '0,0.00';
const RATE_FORMAT: string = '0.00000';
const SI_FORMAT: string = '0,0';

@Injectable({
  providedIn: 'root',
})
export class AppUtil {
  public static isMobile = false;
  public static DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
  public static DATE_FORMAT = 'DD/MM/YYYY';
  public static USERDN: string;
  public static USERDISPLAYNAME: string;
  public static USERROLES: any = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    AppUtil.isMobile = this._isMobile();
  }

  private _isMobile(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return /Mobi/.test(navigator.userAgent);
    }
    return false; // Default to false if not in a browser environment
  }

  public handleArray(mainObj: any, valObj: any, arrayName: any) {
    if (valObj[arrayName] == null || (valObj[arrayName] != null && typeof valObj[arrayName] === 'string')) {
      mainObj[arrayName] = [];
    } else if (valObj[arrayName] != null && !Array.prototype.isPrototypeOf(valObj[arrayName])) {
      const tempAry: any = valObj[arrayName];
      mainObj[arrayName] = [tempAry];
    } else if (Array.prototype.isPrototypeOf(valObj[arrayName])) {
      mainObj[arrayName] = valObj[arrayName];
    }
  }

  public setFieldValue(mainObj: any, valObj: any) {
    const fields = Object.keys(valObj);
    for (const eachFld of fields) {
      if (eachFld.startsWith('@') === false) {
        if (typeof valObj[eachFld] === 'string' || typeof valObj[eachFld] === 'number') {
          mainObj[eachFld] = valObj[eachFld];
        }
      }
    }
  }

  public setFieldValueByType(mainObj: any, valObj: any) {
    const fields = Object.keys(mainObj);
    for (const eachFld of fields) {
      if (eachFld.startsWith('@') === false) {
        if (typeof mainObj[eachFld] === 'string') {
          if (typeof valObj[eachFld] === 'string') {
            mainObj[eachFld] = valObj[eachFld];
          } else {
            mainObj[eachFld] = '';
          }
        } else if (typeof mainObj[eachFld] === 'number') {
          if ((typeof valObj[eachFld] === 'string' || typeof valObj[eachFld] === 'number') && valObj[eachFld] !== '') {
            mainObj[eachFld] = numeral(valObj[eachFld]).value();
          } else {
            mainObj[eachFld] = 0;
          }
        }
      }
    }
  }

  getArray(arrOrObj: any) {
    let ary = [];
    if (arrOrObj != null && Array.prototype.isPrototypeOf(arrOrObj)) {
      ary = arrOrObj;
    } else if (arrOrObj != null && !Array.prototype.isPrototypeOf(arrOrObj)) {
      ary = [arrOrObj];
    }
    return ary;
  }

  fillArray(src: any, valAry: any) {
    src.splice(0, src.length);
    for (const val of valAry) {
      src.push(val);
    }
  }

  isValidObj(valObj: any) {
    if (valObj == null || typeof valObj === 'string') {
      return false;
    } else {
      return true;
    }
  }

  getTotalByProperty(prop: any, ary: any, format: any) {
    let total = 0;
    if (ary != null && ary.length > 0) {
      for (const eachItem of ary) {
        if (eachItem[prop] != null && eachItem[prop] !== '' && !isNaN(eachItem[prop])) {
          total = total + parseFloat(eachItem[prop]);
        }
      }
    }
    const formatted = format != null ? numeral(total).format(format) : total;
    const nonFormatted = numeral(formatted).value();

    return { formatted, nonFormatted };
  }

  public getPathFromHash() {
    return window.location.hash !== '' ? window.location.hash.replace('#', '') : '';
  }

  public setAppInInURL(appID: any) {
    if (appID != null && appID !== '') {
      window.history.replaceState(null, '', `?app=${appID}`);
    } else {
      window.history.replaceState(null, '', '');
    }
  }

  public setURLToRootAppPath(appID: any) {
    this.setAppInInURL(appID);
  }

  public getAppIdFromURL() {
    let app = '';
    const hash = window.location.search;
    if (hash.indexOf('?app=') !== -1) {
      let allparams = hash.split('?app=')[1];
      app = allparams.indexOf('&') === -1 ? allparams : hash.split('&')[0];
      app = allparams.indexOf('#') === -1 ? allparams : hash.split('#')[0];
    }

    return app.replace('/', '');
  }

  public getRouteConfigFromURL(rt: any) {
    const rtConfig = this.getRouteConfig(rt);
    if (rtConfig.length > 1) {
      return [rtConfig[0], rtConfig[1]];
    } else {
      return [rtConfig[0]];
    }
  }

  getRiskCode(risk: any) {
    let code = '';
    if (risk != null) {
      code = risk;
      if (code.length < 3) {
        while (code.length < 3) {
          code = code + ' ';
        }
      }
    }
    return code;
  }

  getRouteConfig(rt: any) {
    const rts = [];
    const curRt = decodeURIComponent(rt);
    const allPrms = curRt.split(';');
    const prms: any = {};
    let count = 0;
    for (const each of allPrms) {
      if (count === 0) {
        rts.push(allPrms[count]);
      } else {
        const prm = each.split('=');
        prms[prm[0]] = prm[1];
      }
      count++;
    }
    if (Object.keys(prms).length > 0) {
      rts.push(prms);
    }
    return rts;
  }

  public static getFormattedDate(date: any, inFormat: any, outFormat: any) {
    return moment(moment.utc(date, inFormat).toDate()).format(outFormat);
  }

  public static getUTCDate(date: any, inFormat: any, outFormat: any, hasTime: any) {
    if ('Y' === hasTime) {
      return moment.utc(moment.utc(moment(date, outFormat))).format(inFormat);
    } else {
      return moment(date, outFormat).format(inFormat);
    }
  }

  public static comparator(a: any, b: any): number {
    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      // Isn't a number so lowercase the string to properly compare
      if (a && b && a.toLowerCase() < b.toLowerCase()) {
        return -1;
      }
      if (a && b && a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
    } else {
      // Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) {
        return -1;
      }
      if (parseFloat(a) > parseFloat(b)) {
        return 1;
      }
    }
    return 0; // equal each other
  }

  public convertDate(currentDate: string, currentFormat: string, newFormat: string) {
    return moment(currentDate, currentFormat).format(newFormat);
  }

  public static isEmpty(aryRitm: any, isAny: any) {
    const isItEmtAry = [];
    if (Array.prototype.isPrototypeOf(aryRitm)) {
      for (const item of aryRitm) {
        if (AppUtil.isNull(item, false) || item === '') {
          isItEmtAry.push(true);
        } else {
          isItEmtAry.push(false);
        }
      }
      const trs = isItEmtAry.filter((item) => item === true);
      if (isAny === true) {
        if (trs.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        if (trs.length === isItEmtAry.length) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      if (AppUtil.isNull(aryRitm, isAny) || aryRitm === '') {
        return true;
      } else {
        return false;
      }
    }
  }

  public static getValueByPath(obj: any, path: any) {
    let value: any = obj;
    if (AppUtil.isEmpty(path, false) === false) {
      if (obj) {
        const ppts = path.split('.');
        for (const ppt of ppts) {
          if (AppUtil.isNull(value, false) === false) {
            value = value[ppt];
          } else {
            break;
          }
        }
      }
    }

    return value;
  }

  public static isNull(aryRitm: any, isAny: any) {
    const isItNullAry = [];
    if (Array.prototype.isPrototypeOf(aryRitm)) {
      for (const item of aryRitm) {
        if (item == null || item === undefined) {
          isItNullAry.push(true);
        } else {
          isItNullAry.push(false);
        }
      }
      const trs = isItNullAry.filter((item) => item === true);
      if (isAny === true) {
        if (trs.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        if (trs.length === isItNullAry.length) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      if (aryRitm == null || aryRitm === undefined) {
        return true;
      } else {
        return false;
      }
    }
  }

  public static getValueByPathFromAry(idValue: any, idPath: any, valPath: any, ary: any) {
    let value = '';
    if (AppUtil.isNull([idValue, idPath, valPath, ary], true) === false) {
      for (const item of ary) {
        if (AppUtil.getValueByPath(item, idPath) === idValue) {
          value = AppUtil.getValueByPath(item, valPath);
          break;
        }
      }
    } else {
      return value;
    }
    return value;
  }

  public static getCopy(obj: any) {
    return jQuery.extend(true, {}, obj);
  }

  public static getPremFormat() {
    return PREM_FORMAT;
  }

  public static getSIFormat() {
    return SI_FORMAT;
  }

  public static getRateFormat() {
    return RATE_FORMAT;
  }

  public static getPremiumNumber(premium: any) {
    if (isNaN(premium) || AppUtil.isEmpty(premium, false)) {
      return 0;
    } else {
      return numeral(numeral(parseFloat('' + premium)).format(AppUtil.getPremFormat())).value();
    }
  }

  public static getSumInsuredNumber(sumInsured: any) {
    if (isNaN(sumInsured) || AppUtil.isEmpty(sumInsured, false)) {
      return 0;
    } else {
      return numeral(numeral(parseFloat('' + sumInsured)).format(AppUtil.getSIFormat())).value();
    }
  }

  public static getRateNumber(rate: any) {
    if (isNaN(rate) || AppUtil.isEmpty(rate, false)) {
      return 0;
    } else {
      return numeral(numeral(parseFloat('' + rate)).format(AppUtil.getRateFormat())).value();
    }
  }

  // AL001 START
  public static dateRangeContainsLeapYear(dateRange: any) {
    for (let year = dateRange.start.year(); year <= dateRange.end.year(); year++) {
      const date = moment(`${year}-02-29`);
      if (date.isLeapYear() && dateRange.contains(date)) {
        return true;
      }
    }
    return false;
  }
  // AL001 END
  // AL001 modified below method to cal no days in year
  public static getPremForPOI(premium: any, startDate: any, endDate: any) {
    const diffDays = moment(endDate, 'YYYY-MM-DD').diff(moment(startDate, 'YYYY-MM-DD'), 'days') + 1;
    const endDateMoment = moment(endDate, 'YYYY-MM-DD');
    const effDateMoment = moment(startDate, 'YYYY-MM-DD');
    const dateRange = moment.range(effDateMoment, endDateMoment);
    /* Uncomment To test indipendently by giving required dates
    let daterange2=moment.range(moment("2019-03-27","YYYY-MM-DD"), moment("2020-03-28","YYYY-MM-DD"));
    console.log("is leapyear ="+this.dateRangeContainsLeapYear(daterange2));
    */
    const output = this.dateRangeContainsLeapYear(dateRange);
    let noDaysInyear = 365;
    if (output) {
      noDaysInyear = 366;
    }

    return numeral(numeral((premium / noDaysInyear) * diffDays).format(AppUtil.getPremFormat())).value();
  }

  public getCookieByName(cname: any): string {
    if (isPlatformBrowser(this.platformId)) {
      const name = cname + '=';
      const allCookie = document.cookie.split(';');
      for (let eachCookie of allCookie) {
        while (eachCookie.charAt(0) === ' ') {
          eachCookie = eachCookie.substring(1);
        }
        if (eachCookie.indexOf(name) === 0) {
          return eachCookie.substring(name.length, eachCookie.length);
        }
      }
    }
    return ''; // Return an empty string if not in a browser environment
  }

  public static decFormatNoRound(val: any, format: any) {
    const mult = parseInt(`1${format.split('.')[1]}`);
    return numeral(numeral(Math.floor(numeral(val).value() * mult) / mult).format(format)).value();
  }

  public static getNotInList(aryItems: any, path: any) {
    let list = '';
    if (AppUtil.isNull(aryItems, false) === false && aryItems.length > 0) {
      let newArr: any = [];
      for (const item of aryItems) {
        const itmVal = AppUtil.getValueByPath(item, path);
        newArr = newArr.concat(itmVal);
      }
      list = `'${newArr.toString().replace(/,/g, "','")}'`;
    }
    return list;
  }
}

export class ChangeImpact {
  public isChanged: boolean = false;
  public itemChanged: ItemChange[] = [];
}

export class ItemChange {
  public item: string = '';
  public itemChanged: boolean = false;
  public message: string = '';
}