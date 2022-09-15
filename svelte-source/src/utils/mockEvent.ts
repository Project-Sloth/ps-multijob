export default function mockEventCall(data: unknown = {}) {
  window.dispatchEvent(
    new MessageEvent("message", {data})
  );
};

export function exampleCall() {
  setTimeout(() => {
    mockEventCall({
      action: 'show',
      data: {
        header: "Some Header!",
      },
    });
  }, 1000);  
};