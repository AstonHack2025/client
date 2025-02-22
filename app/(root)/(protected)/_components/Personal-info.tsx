import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PersonalInfoValidation } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";



export default function PersonalInfoForm(){

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof PersonalInfoValidation>>({
        resolver: zodResolver(PersonalInfoValidation),
        defaultValues: {
            age: "",
            gender: "",
            pronouns: "",
            city: "",
            country: ""
        },
    });


    return (
            <Card>   
            <CardContent className="flex flex-col space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                    <Input disabled={isPending} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                    <Input disabled={isPending} placeholder="18" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="pronouns"
                render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel>Pronouns</FormLabel>
                    <FormControl>
                    <Input disabled={isPending} placeholder="He/Him" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                    <Input disabled={isPending} placeholder="Optional" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                    <Input disabled={isPending} placeholder="e.g. New York" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                    <Input disabled={isPending} placeholder="e.g. USA" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </CardContent>

        </Card>
    )
}