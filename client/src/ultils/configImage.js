const configImage = (imagePath) => {
    try {
      // Adjust the path based on your directory structure
      return require(`../assets/story/${imagePath}`);
    } catch (err) {
      console.error("Image not found:", imagePath);
      return null; // Or return a default image
    }
  };
export default configImage