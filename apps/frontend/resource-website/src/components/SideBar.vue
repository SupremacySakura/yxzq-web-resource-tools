<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const sideBarList = [
    {
        id: 0,
        name: "主页",
        path: "/home"
    },
    {
        id: 1,
        name: "上传文件",
        path: "/uploadFile"
    },
    {
        id: 2,
        name: "文件管理",
        path: "/fileManagement"
    }
]
const handleClick = (path: string) => {
    router.push(path)
}
</script>

<template>
    <div class="container">
        <h2>ResourceWebsite</h2>
        <ul>
            <li v-for="(item) of  sideBarList " :key="item.id" :class="{ active: $route.path === item.path }"
                @click="handleClick(item.path)">{{ item.name
                }}
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.container {
    width: 300px;
    height: 100vh;
    background-color: #2c3e50;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px 0;

    @media screen and (max-width: 500px) {
        width: 30%;
        padding: 15px 0;
    }

    h2 {
        color: #ecf0f1;
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 30px;
        font-weight: 600;
        letter-spacing: 1px;
    }

    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;

        @media screen and (max-width: 500px) {
            gap: 10px;
        }

        li {
            width: 85%;
            height: 45px;
            text-align: center;
            line-height: 45px;
            background-color: rgba(236, 240, 241, 0.1);
            color: #ecf0f1;
            list-style: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;

            @media screen and (max-width: 500px) {
                width: 80%;
            }

            &:hover {
                background-color: rgba(236, 240, 241, 0.2);
                transform: translateX(5px);
            }
        }

        .active {
            background-color: rgba(236, 240, 241, 0.2);
            transform: translateX(8px);
            border-left: 4px solid #3498db;
            font-weight: 600;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
    }
}
</style>