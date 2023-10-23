import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layout";
import { supabase } from "../utils/supabase";
import { Task, Notice } from "../types/types";

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("getServerSideProps");
  const { data: tasks } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });
  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: true });

  return { props: { tasks, notices } };
};
type StaticProps = {
  tasks: Task[];
  notices: Notice[];
};
const Ssr: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter();
  return (
    <Layout title="SSR">
      <p className="text-pink-500">SSR</p>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg">{task.title}</p>
            </li>
          );
        })}
      </ul>
      <ul>
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg">{notice.content}</p>
            </li>
          );
        })}
      </ul>
      <Link href="/ssg" prefetch={false}>
        <a className="mb-3 text-xs">Link to ssg</a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a className="mb-3 text-xs">Link to isr</a>
      </Link>
      <button className="mb-3" onClick={() => router.push('/ssg')}>
        Route to ssg
      </button>
      <button className="mb-3" onClick={() => router.push('/isr')}>
        Route to ssg
      </button>
    </Layout>
  );
};

export default Ssr;
