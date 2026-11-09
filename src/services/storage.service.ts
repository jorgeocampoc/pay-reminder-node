import { createClient } from "@supabase/supabase-js";
import { env } from "../config/index.js";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);

const uploadImage = async () => {

};

export {uploadImage}