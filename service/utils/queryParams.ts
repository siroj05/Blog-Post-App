import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

 export const queryParams = (newParams: Record<string, string | number>, router : AppRouterInstance, searchParams : ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value.toString());
    });
    router.push(`?${params.toString()}`, { scroll: false });
};