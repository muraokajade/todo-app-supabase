import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layout } from "../components/layout";
import { supabase } from "../utils/supabase";
import { Task, Notice } from "../types/types";

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });
      setTasks(tasks as Task[]);
    };
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: true });
      setNotices(notices as Notice[]);
    };
    getTasks();
    getNotices();
  }, []);
  return (
    <Layout title="CSR">
      <p>SSG + CSF</p>
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
    </Layout>
  );
};

export default Csr;
