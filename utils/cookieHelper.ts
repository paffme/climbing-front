export function getCookies(): Array<Object> {
  const cookies = document.cookie.split(";");
  const allCookies: Array<any> = [];
  cookies.forEach(cookie => {
    const splitted = cookie.split("=");
    if (!splitted[0] || !splitted[1]) return;
    allCookies.push({ [splitted[0]]: splitted[1] });
  });
  return allCookies;
}

export function getCookie(name: string): null | {} {
  const cookies = document.cookie.split(";");
  let finalCookie = null;
  cookies.forEach(cookie => {
    const splitted = cookie.split("=");

    if (splitted[0] === name) {
      finalCookie = {
        [splitted[0]]: splitted[1]
      };
    }
  });
  return finalCookie;
}

export function getCookieObject(name: string): any {
  const cookie = document.cookie.split(";")[1];
  const splitted = cookie.split("=");

  return JSON.parse(splitted[1]);
}

export function removeCookies(): void {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function removeCookie(cookieName: string): void {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function createCookie(key: string, value: string, path = "/"): void {
  document.cookie = `${key}=${value}; path=${path}`;
}

export function createCookieFromObject(key: string, value: object, path = "/"): void {
  document.cookie = `${key}=${JSON.stringify(value)}; path=${path}`;
}
