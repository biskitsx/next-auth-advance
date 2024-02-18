import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { CardWrapper } from "./card-wrapper";
import { Header } from "./header";

interface ErrorCardProps {}
export const ErrorCard = ({}: ErrorCardProps) => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
