import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { server$, Form } from "@builder.io/qwik-city";

export default component$(() => {
  const input = useSignal("");
  const words = useSignal("");

  const handleSubmit = $(async () => {
    const data = await getWords(input);
    if (data) {
      words.value = data;
    } else {
      words.value = "No words founds";
    }
  });

  return (
    <div class="flex flex-col h-screen justify-center items-center">
      <p class="mb-36 font-extrabold text-8xl">Word Forms</p>
      <Form class="form-control">
        <div class="input-group">
          <input
            type="text"
            placeholder="Enter the word"
            class="input input-bordered"
            bind:value={input}
          />
          <button type="submit" class="btn btn-square" onClick$={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </Form>
      <p class="mt-36 font-bold">{words.value}</p>
    </div>
  );
});

export const getWords = server$(async function (input) {
  const url = `${this.env.get("API_PRIVATE_URL")}/wordforms?word=${
    input.value
  }`;
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData.wordForms;
});

export const head: DocumentHead = {
  title: "Word Forms",
  meta: [
    {
      name: "description",
      content: "Get all forms of a given word",
    },
  ],
};
