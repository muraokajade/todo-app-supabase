import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { GetStaticProps } from "next";
import { Layout } from "../components/layout";
import { supabase } from "../utils/supabase";
import { Task, Notice } from "../types/types";

export const getStaticProps: GetStaticProps = async () => {
  console.log("getStaticProps");
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

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
    const router = useRouter()
  return (
    <Layout title="SSG">
      <p className="text-blue-500">SSG</p>
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
      <Link href="/ssr" prefetch={false} legacyBehavior>
        <a className="mb-3 text-xs">Link to ssg</a>
      </Link>
      <button className="mb-3" onClick={() => router.push('/ssr')}>
        Route to ssr
      </button>
    </Layout>
  );
};

export default Ssg;
