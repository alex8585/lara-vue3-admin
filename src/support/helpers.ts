import Cookies from "js-cookie";

export function getLocales() {
  return ["en", "uk", "ru"];
}

export function getCurrLang() {
  let locale = Cookies.get("locale");
  if (!locale) {
    locale = "ru";
    Cookies.set("locale", locale);
  }
  return locale;
}

export function getApiUrl(part = "") {
  const locale = getCurrLang();
  const url = `/api/v1/${locale}/${part}`;
  return url;
}

export function getLocalesFields(fields: Array<string>) {
  const locales = getLocales();
  const obj: StringsObj = {};
  for (const field of fields) {
    for (const locale of locales) {
      const keyName = `${locale}_${field}`;
      obj[keyName] = "";
    }
  }
  return obj;
}
export function getTranslation(row: any, currentLoc: string, name: string) {
  if (typeof row["tr"][currentLoc] !== "undefined")
    return row["tr"][currentLoc][name];
}

export function imgUrlFromFile(file: any) {
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(file);
  return imageUrl;
}
export function stripHtml(html: string) {
  const temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = html;
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

export function stripTags(str: string) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}
export function shorten(str: string, no_words: number, suff = " ...") {
  let newStr = str.split(" ").splice(0, no_words).join(" ");
  newStr = stripHtml(newStr);
  newStr = stripTags(newStr);

  if (str.length > newStr.length) {
    newStr += suff;
  }
  return newStr;
}
export function filterArrToFilterStr(filter: any) {
  let filterStr = "";

  if (filter) {
    const filterObj = filter.value;
    if (filterObj) {
      for (const prop in filterObj) {
        let val = filterObj[prop];
        if (val.value || val.label) {
          val = val.value;
        } else if (typeof val === "object") {
          const vals = [...val].map((e) => {
            return e.value;
          });
          val = vals.join(",");
        }
        filterStr += `&filter[${prop}]=${val}`;
      }
    }
  }
  return filterStr;
}
