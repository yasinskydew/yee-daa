import Badge from "@/app/ui/badge";
import Button from "@/app/ui/button";
import { CategoryIcon } from "@/app/ui/icons";
import clsx from "clsx";

export default function SubscriptionsPage() {
  return (
    <div className={clsx("flex flex-col m-5 gap-2 items-center")}>
      <h1>subscriptions</h1>
      <Button>Button </Button>
      <Button variant="secondary" >Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="ghost" size="sm">
        Button
      </Button>
      <Badge leftIcon={<CategoryIcon name="salads" />}>
        Салаты
      </Badge>
      <Badge variant="secondary" leftIcon={<CategoryIcon name="desserts" />}>
        Десерты и выпечка
      </Badge>
    </div>
  );
}
