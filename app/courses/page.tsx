import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ grade?: string }>;
}

export default async function CoursesPage({ searchParams }: Props) {
  const { grade } = await searchParams;

  if (grade === '1') redirect('/grade1');
  if (grade === '2') redirect('/grade2');

  redirect('/');
}
