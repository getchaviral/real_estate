const { GOOGLE_IMG_SCRAP } = require('google-img-scrap');

async function test() {
  try {
    const res = await GOOGLE_IMG_SCRAP({
        search: "Silver Springs project real estate noida",
        limit: 3
    });
    console.log(JSON.stringify(res.result, null, 2));
  } catch (err) {
    console.error(err);
  }
}
test();
