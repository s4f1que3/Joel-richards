import { SupabaseClient } from "@supabase/supabase-js";
export declare class supabaseService {
    private client;
    constructor();
    get db(): SupabaseClient;
}
