"use client";
import fetchCategoryCompletion from "./fetchCategoryCompletion";
import Badge from "@/components/shared/badge";
import React from "react";

export default function displayBadges() {
    const listBadges = badgeData.map(item => {
        return {
            <Badge
            color={item.color}
            category={item.category}
            icon={"🔥"}
            stars={3}
            completion={1}
            />
        }
    })
    return listBadges
}