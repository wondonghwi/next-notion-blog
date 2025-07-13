import { Card, CardContent } from '@/components/ui/card';
import { Youtube, Github, BookOpen, Instagram } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const socialLinks = [
  {
    id: 1,
    icon: Youtube,
    href: 'https://www.youtube.com/gymcoding',
  },
  {
    id: 2,
    icon: Github,
    href: 'https://github.com/gymcoding',
  },
  {
    id: 3,
    icon: BookOpen,
    href: 'https://www.inflearn.com/users/432199/@gymcoding',
  },
  {
    id: 4,
    icon: Instagram,
    href: 'https://www.instagram.com/gymcoding',
  },
];

export function ProfileSection() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-muted rounded-full p-2">
              <div className="h-36 w-36 overflow-hidden rounded-full">
                <Image
                  src="/images/profile.webp"
                  alt="profile"
                  width={144}
                  height={144}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold">원동휘</h3>
            <p className="text-primary text-sm">Frontend Developer</p>
          </div>

          <div className="flex justify-center gap-2">
            {socialLinks.map((item) => (
              <Button key={item.id} variant="ghost" className="bg-primary/10" size="icon" asChild>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <item.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>

          <p className="bg-primary/10 rounded p-2 text-center text-sm">
            ✨ 11번가 프론트엔드 개발자 ✨
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
