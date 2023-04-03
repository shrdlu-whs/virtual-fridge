export const getMilliesFormated = (millies: number) => {
  var d = new Date(millies),
    dformat = [d.getHours() - 1, d.getMinutes(), d.getSeconds()].join(":");
  return dformat;
};

export const getMinutesTotalRounded = (millies: number) => {
  var d = new Date(millies);
  const hours = d.getHours() - 1;
  let minutesTotal = d.getMinutes() + hours * 60;
  const seconds = d.getSeconds();

  if (seconds >= 30) minutesTotal++;

  if (minutesTotal == 0) minutesTotal = 1;

  return minutesTotal + " min";
};

export const getMillesFromString = (timeStr: string) => {
    const timeArray = timeStr.split(":");
    const hours = parseInt(timeArray[0])
    const minutes = parseInt(timeArray[1])

    if(timeArray.length > 2) {
      const seconds = parseInt(timeArray[2])
      return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
    }

    const millies = hours * 60 * 60 * 1000 + minutes * 60 * 1000 
    return millies;
}   