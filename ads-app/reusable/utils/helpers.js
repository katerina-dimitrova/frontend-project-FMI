export function createUser(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
  
    return {
      email,
      password,
    };
  }

export function createAd(title, description, price, image = "../../assets/images/default_ad_image.jpg") {
    if (!title || !description || !price || !image) {
      throw new Error("Title, description, price, and image are required");
    }
  
    return {
      title,
      description,
      price,
      image,
    };
  }