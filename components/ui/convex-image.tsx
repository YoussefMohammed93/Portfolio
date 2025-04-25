"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image, { ImageProps } from "next/image";

interface ConvexImageProps extends Omit<ImageProps, "src"> {
  storageId: string;
}

export function ConvexImage({ storageId, alt, ...props }: ConvexImageProps) {
  const [error, setError] = useState<boolean>(false);

  const imageUrl = useQuery(api.files.getImageUrl, { storageId });

  if (!imageUrl || error) {
    return (
      <div
        className="bg-muted flex items-center justify-center"
        style={{
          width: typeof props.width === "number" ? props.width : "100%",
          height: typeof props.height === "number" ? props.height : "100%",
          position: props.fill ? "absolute" : "relative",
          inset: props.fill ? 0 : undefined,
        }}
      >
        <div className="text-sm text-muted-foreground">
          {error ? "Failed to load image" : "Loading..."}
        </div>
      </div>
    );
  }

  return (
    <Image src={imageUrl} alt={alt} {...props} onError={() => setError(true)} />
  );
}
