import request from "request";

type myFilter = {
  name?: string
  gender?: string
  race?: string
  afiliation?: string
}

export const findCharacter = (filter: myFilter) => {
  const queryParams = Object.keys(filter)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`)
    .join('&');

  const url = `https://dragonball-api.com/api/characters?${queryParams}`;

  //const url = `https://dragonball-api.com/api/characters?Name=${encodeURIComponent(filter.name)}&Gender=${encodeURIComponent(filter.gender)}&Race=${encodeURIComponent(filter.race)}&Afiliation=${encodeURIComponent(filter.afiliation)}`;

  return new Promise<request.Response>((resolve, reject) => { 
    request(
      { url: url, json: true },
      (error: Error, response: request.Response) => {
        if (error) {
          reject(error.message);
        } else if (response.body.length === 0) {
          reject("Dragon-Ball API error: no character found");
        } else {
          resolve(response);
        }
      },
    );
  });
};

// findCharacter({ name: "Vegeta", race: "Saiyan" }).then((characters) => {
//   console.log(characters.body);
// }).catch((error) => {
//   console.log(error);
// });