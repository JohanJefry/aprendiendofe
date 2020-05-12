//utils
import { isBrowser, isDefined } from '@is';

export function cx(...clases) {//le pasas un array de clases y las junta
  return clases.join(' ').trim();
}

export function redirectTo(url = '/') {//si es browser hace un redirect con windows
  //console.log('entro  redirecTo')
  if (isBrowser()) {
    window.location.href = url  === '_self' ? window.location.pathname : url;
  }
  //return false;
}

export function isFirstRender(items) {
  return !isDefined(items) || items.length === 0 || Object.keys(items).length === 0;
}
