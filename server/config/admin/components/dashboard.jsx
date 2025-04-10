import React, { useEffect, useState } from "react";
import {
  Box,
  H2,
  H5,
  Text,
  Illustration,
  Link,
  Button,
  Icon,
} from "@adminjs/design-system";
import axios from "axios";

const DashboardComponent = () => {
  const [stats, setStats] = useState({
    users: 0,
    groups: 0,
    posts: 0,
    courses: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/api/dashboard-stats");
        setStats(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке статистики", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box variant="grey" padding="xxl">
      <Box
        bg="white"
        boxShadow="card"
        padding="xl"
        borderRadius={15}
        flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb="xl"
      >
        <Box>
          <H2>
            Добро пожаловать в <strong>System Content Admin</strong>
          </H2>
          <Text mt="lg" color="grey80">
            Управляйте контентом, курсами, группами и пользователями в одном
            месте.
          </Text>
          <Box mt="xl" flex flexDirection="row">
            <Link
              size="lg"
              href="/admin/resources/Post/actions/new"
              variant="primary"
            >
              <Icon icon="Plus" mr="default" />
              Новый пост
            </Link>
            <Link
              href="/admin/resources/Course/actions/new"
              variant="secondary"
              size="lg"
            >
              <Icon icon="Book" mr="default" />
              Новый курс
            </Link>
          </Box>
        </Box>
        <Illustration variant="Rocket" width={240} />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap="xl"
      >
        <StatCard label="Пользователи" count={stats.users} icon="User" />
        <StatCard label="Группы" count={stats.groups} icon="Users" />
        <StatCard label="Посты" count={stats.posts} icon="File" />
        <StatCard label="Курсы" count={stats.courses} icon="Book" />
      </Box>
    </Box>
  );
};

const StatCard = ({ label, count, icon }) => (
  <Box
    bg="white"
    borderRadius={10}
    boxShadow="card"
    padding="lg"
    textAlign="center"
  >
    <Icon icon={icon} size={40} color="primary100" />
    <H5 mt="lg">{label}</H5>
    <Text fontSize={24} fontWeight={700} mt="sm">
      {count}
    </Text>
  </Box>
);

export default DashboardComponent;
