export async function getBlog(
  id,
  setTitle,
  setCategory,
  setParagraph,
  setType,
  setImage,
  setError
) {
  try {
    const response = await fetch(`https://royal-tech-blog.onrender.com/blogs/myblogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.title) {
        setTitle(data.title);
        setCategory(data.category);
        setParagraph(data.paragraph);
        setType(data.type);
        setType(data.type);
        setImage(data.image);
      } else {
        setTitle(data.blog.title);
        setCategory(data.blog.category);
        setParagraph(data.blog.paragraph);
        setType(data.blog.type);
        setType(data.blog.type);
        setImage(data.blog.image);
      }
    } else {
      setError("Failed to fetch blog details");
    }
  } catch (error) {
    setError("An unexpected error occurred");
  }
}
