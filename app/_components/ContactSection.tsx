import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const contactItems = [
  {
    id: '1',
    icon: Mail,
    title: '개인 이메일',
    description: '개인적인 문의와 협업 제안',
    mailto: {
      email: 'donghwi1289@gmail.com',
      subject: '문의',
      body: '안녕하세요,\n\n문의 내용:',
    },
  },
  {
    id: '2',
    icon: Mail,
    title: '회사 이메일',
    description: '업무 관련 문의와 협업',
    mailto: {
      email: 'dh.won@sk.com',
      subject: '[회사] 문의',
      body: '안녕하세요,\n\n문의 내용:',
    },
  },
];

export function ContactSection() {
  return (
    <Card className="overflow-hidden rounded-[28px] border-border/70 bg-card/80 py-0 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)] backdrop-blur-xl">
      <CardHeader className="border-b border-border/60 py-5">
        <CardTitle className="text-base font-semibold tracking-tight">문의하기</CardTitle>
        <CardDescription>개인 문의와 협업 제안을 메일로 받습니다.</CardDescription>
      </CardHeader>

      <CardContent className="px-4 py-4">
        <div className="space-y-3">
          {contactItems.map((item) => (
            <a
              key={item.id}
              href={`mailto:${item.mailto.email}?subject=${encodeURIComponent(
                item.mailto.subject
              )}&body=${encodeURIComponent(item.mailto.body)}`}
              className="group flex items-start gap-3 rounded-2xl border border-transparent bg-muted/45 p-3 transition-all duration-200 hover:border-primary/15 hover:bg-accent/80"
            >
              <div className="bg-primary/14 text-primary flex shrink-0 items-center justify-center rounded-xl p-2">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground mt-1 text-xs leading-5">{item.description}</p>
                <p className="text-muted-foreground mt-2 truncate text-[11px]">{item.mailto.email}</p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
