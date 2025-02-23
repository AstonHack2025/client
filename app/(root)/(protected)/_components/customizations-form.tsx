import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomizationsValidation } from "@/lib/validations/auth";
import { useEffect, useState, useTransition } from "react";
import { customizations } from "@/lib/actions/auth/customizations";
import { useSession } from "next-auth/react";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { fetchUserById } from "@/lib/api-handler/user";

export default function CustomizationsForm() {
    const { data: session, status, update } = useSession({ required: true });

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CustomizationsValidation>>({
        resolver: zodResolver(CustomizationsValidation),
        defaultValues: {
            age: "",
            gender: "",
            pronouns: "",
            city: "",
            degree: "",
            university: "",
            year: "",
            course: "",
        },
    });

    const { reset } = form; // Get reset function from useForm

    useEffect(() => {
        if (session?.user?._id) {
            fetchUserById(session.user._id).then((data) => {
                if (data) {
                    reset(data); // Reset form with fetched data
                }
            });
        }
    }, [session, reset]); // Depend on session and reset function

    function onSubmit(values: z.infer<typeof CustomizationsValidation>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            customizations(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    } else if (data?.success) {
                        update();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="grid grid-cols-2 gap-5">
                    {/* Personal Info Section */}
                    <div className="flex flex-col col-span-1 space-y-4">
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
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
                                <FormItem>
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
                                <FormItem>
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
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="e.g. New York" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Academic Information Section */}
                    <div className="flex flex-col space-y-4 col-span-1">
                        <FormField
                            control={form.control}
                            name="course"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Course</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="Current Course" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="degree"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Degree</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="Current Degree" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="university"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your University</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="Your university" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Current Year</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="Your current year" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-2">
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button size="lg" className="w-full mt-3" type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
