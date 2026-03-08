import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const socialLinks = [
  {
    id: 1,
    icon: Github,
    href: 'https://github.com/wondonghwi',
  },
  {
    id: 2,
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/%EB%8F%99%ED%9C%98-%EC%9B%90-0652911a2/',
  },
];

export function ProfileSection() {
  return (
    <Card className="overflow-hidden rounded-[28px] border-border/70 bg-card/80 py-0 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)] backdrop-blur-xl">
      <div className="from-primary/18 via-primary/6 h-16 bg-gradient-to-br to-transparent" />
      <CardContent className="-mt-8 px-5 pb-5">
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="bg-background/90 rounded-full border border-border/70 p-2 shadow-lg">
              <div className="h-28 w-28 overflow-hidden rounded-full md:h-32 md:w-32">
                <Image
                  src="/images/profile.webp"
                  alt="profile"
                  width={144}
                  height={144}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1 text-center">
            <p className="text-muted-foreground text-[0.68rem] font-semibold tracking-[0.24em] uppercase">
              Profile
            </p>
            <h3 className="text-xl font-semibold tracking-tight">원동휘</h3>
            <p className="text-primary text-sm font-medium">Frontend Developer</p>
          </div>

          <div className="flex justify-center gap-2">
            {socialLinks.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="bg-primary/10 text-primary hover:bg-primary/15 rounded-full"
                size="icon"
                asChild
              >
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <item.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>

          <p className="bg-primary/8 rounded-2xl border border-primary/15 px-3 py-3 text-center text-sm leading-6">
            프론트엔드 설계와 인터랙션, 제품 완성도를 꾸준히 다듬고 있습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
