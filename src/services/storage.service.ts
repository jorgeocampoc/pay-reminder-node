import { createClient } from "@supabase/supabase-js";
import { env } from "../config/index.js";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);

const uploadImage = async (file: Express.Multer.File) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload("public/avatar1.png", file.buffer);
  console.log(data, error);
};

export { uploadImage };
