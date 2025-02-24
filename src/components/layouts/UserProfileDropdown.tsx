import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SignOutButton from './SignOutButton';
interface Props {
  name: string;
  image: string;
}

export default function UserProfileDropdown({ name, image }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <DropdownMenuContent>
          <DropdownMenuLabel>내 정보</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
