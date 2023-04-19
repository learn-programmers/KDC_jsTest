const Promise = require("bluebird");
const fs = require("fs");
const axios = require("axios");
const { shuffle } = require("lodash");
// Use your own API key
const END_POINT = "https://api.thecatapi.com/v1";
const apiKey = "e83d2c75-da93-4c9e-81d3-5ff1b27f8dd7";
const catNames = require("./catNames");
const dataValidator = require("./dataValidation");

const limit = 100;

const fetcher = axios.create({
  headers: {
    "x-api-key": apiKey
  }
});

const getCatBreeds = async () => {
  const res = await fetcher.get(`${END_POINT}/breeds`);
  const { data: breeds } = res;

  return breeds.map(breed => {
    const { id, name, temperament, origin } = breed;
    return {
      id,
      name,
      temperament,
      origin
    };
  });
};

const allRequests = async () => {
  const breeds = await getCatBreeds();
  const tasks = [];

  for (const breed of breeds) {
    for (let page = 0; page <= 9; page++) {
      const apiUrl = `${END_POINT}/images/search?breed_id${breed.id}&limit=${limit}&page=${page}`;
      tasks.push(
        fetcher({
          url: apiUrl
        })
          .then(res => {
            const { name, temperament, origin } = breed;
            const { data: cats } = res;

            console.log(
              `${apiUrl} ==> ${breed.name} / page ${page} result: ${cats.length}`
            );
            return cats.map(({ id, url, width, height }) => ({
              name: `${name} / ${catNames[name]}`,
              id,
              url,
              width,
              height,
              temperament,
              origin
            }));
          })
          .catch(e => {
            console.log(`ERROR: ${apiUrl} ==> ${e.message}`);
            return [];
          })
      );
    }
  }

  Promise.all(tasks)
    .then(allResponses => {
      const result = allResponses.reduce(
        (flattened, array) => flattened.concat(...array),
        []
      );

      fs.writeFile("data.json", JSON.stringify(shuffle(result)), "utf8", () => {
        console.log(`crwaling success. total data: ${result.length}`);
        dataValidator();
      });
    })
    .catch(error => {
      console.log("**************************************");
      console.log("******** Axios error occured. ********");
      console.log("**************************************");
      console.error(error.response);
      console.log("**************************************");
    });
};

allRequests();
