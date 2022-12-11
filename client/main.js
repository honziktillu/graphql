const content = document.getElementById("content");
const loadData = async () => {
  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
            query {
                books {
                    id,
                    name,
                    pages,
                    releaseDate,
                    price,
                    author {
                        id,
                        name,
                        description,
                        dateOfBirth,
                        quote
                    }
                }
            }
        `,
    }),
  });
  const { data } = await response.json();
  content.innerHTML = "";
  data.books.map((book) => {
    content.innerHTML += `<p>${Object.values(book)}</p>`;
  });
};

window.onload = () => {
  loadData();
};
