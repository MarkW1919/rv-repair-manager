import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### customers

| name    | type | format | required |
|---------|------|--------|----------|
| id      | int8 | number | true     |
| name    | text | string | true     |
| address | text | string | true     |
| phone   | text | string | true     |
| email   | text | string | false    |

### pre_configured_floor_jobs

| name         | type    | format | required |
|--------------|---------|--------|----------|
| id           | int8    | number | true     |
| job_code     | text    | string | true     |
| parts        | jsonb   | json   | false    |
| prices       | jsonb   | json   | false    |
| labor_hours  | numeric | number | false    |
| sublet_costs | numeric | number | false    |
| shop_supplies| numeric | number | false    |
| taxes        | numeric | number | false    |
| job_totals   | numeric | number | false    |

### pre_configured_roof_jobs

| name         | type    | format | required |
|--------------|---------|--------|----------|
| id           | int8    | number | true     |
| job_code     | text    | string | true     |
| parts        | jsonb   | json   | false    |
| prices       | jsonb   | json   | false    |
| labor_hours  | numeric | number | false    |
| sublet_costs | numeric | number | false    |
| shop_supplies| numeric | number | false    |
| taxes        | numeric | number | false    |
| job_totals   | numeric | number | false    |

### estimates

| name               | type                     | format   | required |
|--------------------|--------------------------|----------|----------|
| id                 | int8                     | number   | true     |
| customer_id        | int8                     | number   | false    |
| job_code           | text                     | string   | false    |
| advisor            | text                     | string   | false    |
| payment_type       | text                     | string   | false    |
| deductible         | numeric                  | number   | false    |
| estimate_date      | timestamp with time zone | datetime | false    |
| roof_kit           | jsonb                    | json     | false    |
| roof_membrane      | jsonb                    | json     | false    |
| floor_materials    | jsonb                    | json     | false    |
| roofing_screws     | jsonb                    | json     | false    |
| glue               | jsonb                    | json     | false    |
| additional_parts   | jsonb                    | json     | false    |
| repair_description | text                     | string   | false    |
| notes              | text                     | string   | false    |
| hours              | numeric                  | number   | false    |
| labor_per_hour     | numeric                  | number   | false    |
| sublet             | jsonb                    | json     | false    |
| extras             | jsonb                    | json     | false    |
| labor              | jsonb                    | json     | false    |
| shop_supplies      | numeric                  | number   | false    |
| tax                | numeric                  | number   | false    |

### pre_configured_jobs

| name            | type    | format | required |
|-----------------|---------|--------|----------|
| id              | int8    | number | true     |
| job_code        | text    | string | true     |
| type            | text    | string | true     |
| parts           | jsonb   | json   | false    |
| prices          | jsonb   | json   | false    |
| labor_hour_rates| numeric | number | false    |
| labor_hours     | numeric | number | false    |
| sublet_costs    | numeric | number | false    |
| shop_supplies   | numeric | number | false    |
| taxes           | numeric | number | false    |
| job_totals      | numeric | number | false    |

*/

// Customers
export const useCustomers = () => useQuery({
    queryKey: ['customers'],
    queryFn: () => fromSupabase(supabase.from('customers').select('*'))
});

export const useCustomer = (id) => useQuery({
    queryKey: ['customers', id],
    queryFn: () => fromSupabase(supabase.from('customers').select('*').eq('id', id).single())
});

export const useAddCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCustomer) => fromSupabase(supabase.from('customers').insert([newCustomer])),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('customers').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('customers').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

// Pre-configured Floor Jobs
export const usePreConfiguredFloorJobs = () => useQuery({
    queryKey: ['preConfiguredFloorJobs'],
    queryFn: () => fromSupabase(supabase.from('pre_configured_floor_jobs').select('*'))
});

export const usePreConfiguredFloorJob = (id) => useQuery({
    queryKey: ['preConfiguredFloorJobs', id],
    queryFn: () => fromSupabase(supabase.from('pre_configured_floor_jobs').select('*').eq('id', id).single())
});

export const useAddPreConfiguredFloorJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('pre_configured_floor_jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredFloorJobs');
        },
    });
};

export const useUpdatePreConfiguredFloorJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('pre_configured_floor_jobs').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredFloorJobs');
        },
    });
};

export const useDeletePreConfiguredFloorJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pre_configured_floor_jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredFloorJobs');
        },
    });
};

// Pre-configured Roof Jobs
export const usePreConfiguredRoofJobs = () => useQuery({
    queryKey: ['preConfiguredRoofJobs'],
    queryFn: () => fromSupabase(supabase.from('pre_configured_roof_jobs').select('*'))
});

export const usePreConfiguredRoofJob = (id) => useQuery({
    queryKey: ['preConfiguredRoofJobs', id],
    queryFn: () => fromSupabase(supabase.from('pre_configured_roof_jobs').select('*').eq('id', id).single())
});

export const useAddPreConfiguredRoofJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('pre_configured_roof_jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredRoofJobs');
        },
    });
};

export const useUpdatePreConfiguredRoofJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('pre_configured_roof_jobs').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredRoofJobs');
        },
    });
};

export const useDeletePreConfiguredRoofJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pre_configured_roof_jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredRoofJobs');
        },
    });
};

// Estimates
export const useEstimates = () => useQuery({
    queryKey: ['estimates'],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*'))
});

export const useEstimate = (id) => useQuery({
    queryKey: ['estimates', id],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*').eq('id', id).single())
});

export const useAddEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEstimate) => fromSupabase(supabase.from('estimates').insert([newEstimate])),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

export const useUpdateEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('estimates').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

export const useDeleteEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('estimates').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

// Pre-configured Jobs
export const usePreConfiguredJobs = () => useQuery({
    queryKey: ['preConfiguredJobs'],
    queryFn: () => fromSupabase(supabase.from('pre_configured_jobs').select('*'))
});

export const usePreConfiguredJob = (id) => useQuery({
    queryKey: ['preConfiguredJobs', id],
    queryFn: () => fromSupabase(supabase.from('pre_configured_jobs').select('*').eq('id', id).single())
});

export const useAddPreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('pre_configured_jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredJobs');
        },
    });
};

export const useUpdatePreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('pre_configured_jobs').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredJobs');
        },
    });
};

export const useDeletePreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pre_configured_jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredJobs');
        },
    });
};