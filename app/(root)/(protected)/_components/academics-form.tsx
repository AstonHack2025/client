import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AcademicsValidation } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";


export default function AcademicsForm(){

    const form = useForm<z.infer<typeof AcademicsValidation>>({
            resolver: zodResolver(AcademicsValidation),
            defaultValues: {
                degree: "",
                university: "",
                year: "",
                course: "",
            },
        });
        
    return (
            <Card>
                <CardHeader>
                    <CardTitle>Academics</CardTitle>
                    <CardDescription>Tell us more about your academic information</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder="your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
    )
}
