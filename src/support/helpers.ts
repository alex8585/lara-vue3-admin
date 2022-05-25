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
        const val = filterObj[prop];
        filterStr += `&filter[${prop}]=${val}`;
      }
    }
  }
  return filterStr;
}
