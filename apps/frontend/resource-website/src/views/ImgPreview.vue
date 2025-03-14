<script setup lang="ts">
import { ref, onMounted } from 'vue'
import yxzqUtils from '@yxzq-web-resource-tools/yxzq-utils-browser'
import { ElMessage } from 'element-plus'
import type { ImageProps } from 'element-plus'
const fit = 'scale-down' as ImageProps['fit']
//图片列表
const imgList = ref<string[]>([])
//预览启用
const showPreview = ref(false)
//初始索引
const initIndex = ref(0)
/**
 * 复制图片链接到剪贴板
 * @param {string} url - 要复制的图片URL
 * @description 使用 Clipboard API 将图片链接复制到剪贴板
 * @throws {Error} 复制失败时抛出错误
 * @async
 * @returns {Promise<void>}
 */
const copyToClipboard = async (url: string) => {
    try {
        // 使用兼容方案
        const textArea = document.createElement('textarea')
        textArea.value = url

        // 避免屏幕闪烁
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        textArea.style.top = '-9999px'

        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        // 执行复制命令
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)

        if (!successful) {
            throw new Error('使用旧版复制方法失败')
        }

        ElMessage.success('复制成功')
    } catch (e) {
        ElMessage.error(`复制失败：${e}`)
    }
}
/**
 * 打开图片预览
 * @param {number} index - 要预览的图片在列表中的索引
 * @description 设置预览图片的初始索引并打开预览窗口
 * @returns {void}
 */
const openPreview = (index: number) => {
    initIndex.value = index
    showPreview.value = true
}
onMounted(() => {
    yxzqUtils.getFilePath({
        url: import.meta.env.MYAPP_BASE_URL,
        extNameConfig: 'photo'
    }).then((res) => {
        imgList.value = res.files
    })
})
</script>

<template>
    <div class="container">
        <ul class="img-list">
            <li v-for="(item, index) of imgList" :key="item" class="img-item">
                <div class="img-item-img">
                    <el-image :src="item" alt="" :fit="fit" style="width: 95%; height: 95%;"/>
                </div>
                <div class="img-item-control">
                    <button @click="openPreview(index)">预览</button>
                    <button @click="copyToClipboard(item)">复制链接</button>
                </div>
            </li>
        </ul>
        <el-image-viewer v-if="showPreview" :url-list="imgList" show-progress :initial-index="initIndex"
            @close="showPreview = false" />
    </div>
</template>

<style lang="less" scoped>
.container {
    flex: 1;
    padding: 32px;
    background-color: #f5f7fa;
    overflow-y: auto;
    .img-list {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;

        .img-item {
            width: 280px;
            border: 1px solid #e4e7ed;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s ease;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            .img-item-img {
                width: 100%;
                height: 200px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f5f7fa;
            }

            .img-item-control {
                padding: 12px;
                text-align: center;
                display: flex;
                gap: 10px;

                button {
                    flex: 1;
                    padding: 6px 16px;
                    border: none;
                    background-color: #409eff;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;

                    &:hover {
                        background-color: #66b1ff;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 500px) {
    .container {
        padding: 16px;

        .img-list {
            gap: 12px;

            .img-item {
                width: 100%;

                .img-item-img {
                    height: 160px;
                }

                .img-item-control {
                    padding: 10px;
                    gap: 8px;

                    button {
                        padding: 8px 12px;
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>
