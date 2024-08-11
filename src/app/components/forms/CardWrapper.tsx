"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/app/components/ui/card";
import AutHeader from "./AuthHeader";
import BackButton from "./BackButton";

interface CardWrapperProps {
  label: string;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
}

const CardWrapper = ({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperProps) => {
  return (
    <Card className="xl:w-1/4 shadow-md">
      <CardHeader>
        <AutHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
