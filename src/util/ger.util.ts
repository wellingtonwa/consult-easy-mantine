

export function getObjectSubValue(data:any, key: string) {
  const keyList = key.split('.');

  let result:any = null;

  keyList.forEach((field, index) => {
    if (result === null && index === 0) {
      result = data[field];
    } else if (!!result && typeof result === 'object') {
      result = result[field];
    }
  });

  return result;
}