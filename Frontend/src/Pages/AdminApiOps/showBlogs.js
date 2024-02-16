export async function ShowBlogs(setBlogs, navigate, setError, setLoading) {
  try {
    const response = await fetch("https://royal-tech-blog.onrender.com/blogs/myblogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.length > 1) {
        setBlogs(data);
        setLoading(false);
        setError("");
      } else {
        setBlogs(data.blogs);
        setLoading(false);
        setError("");
      }
    } else {
      navigate("/admin");
    }
  } catch (error) {
    if (setError) {
      setLoading(false);
      setError("Cannot retrieve blogs please try again later");
    }
  }
}
