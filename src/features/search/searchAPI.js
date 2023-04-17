export const fetchSearch = async (s) => {
  let data;
  try {
    const res = await fetch(
      `https://mobile-staging.gametime.co/v1/search?q=${s}`
    );
    data = await res.json();
  } catch (err) {
    console.log(err);
  }
  return parseData(data);
};

const parseData = (data) => {
  const result = [];
  console.log(data);
  data.display_groups.forEach(({ slug }) => {
    if (slug === "performers") {
      const subArr = data[slug]
        ?.slice(0, 3)
        .map(({ hero_image_url, name, category }) => ({
          image: hero_image_url,
          title: name,
          subtitle: category,
        }));
      result.push(...subArr);
    }
    if (slug === "venues") {
      const subArr = data[slug]
        ?.slice(0, 3)
        .map(({ image_url, name, city }) => ({
          image: image_url,
          title: name,
          subtitle: city,
        }));
      result.push(...subArr);
    }
    if (slug === "events") {
      const subArr = data[slug]
        ?.slice(0, 3)
        .map(({ event, performers, venue }) => ({
          image: performers[0].hero_image_url,
          title: event.name,
          subtitle: venue.name,
        }));
      result.push(...subArr);
    }
  });
  return result;
};
