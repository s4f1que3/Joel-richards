import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class supabaseService {
    private client: SupabaseClient;

    constructor() {
        this.client = createClient(
            process.env.SUPABASE_URL!,
            process.env.SERVICE_ROLE_KEY!,
            { auth: { flowType: 'implicit' } }
        )
    }

    get db(): SupabaseClient {
        return this.client;
    }
}