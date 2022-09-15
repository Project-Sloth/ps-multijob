export default async function fetchNui(eventName: string, data: unknown = {}) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  const getResourceName = () => {
    try {
      // @ts-ignore
      return window.GetParentResourceName();
    } catch(err) {
      return "resource-name";
    }
  }

  const resourceName = getResourceName();

  try {
    const resp = await fetch(`https://${resourceName}/${eventName}`, options);
    return await resp.json();
  } catch(err) {
  }
}