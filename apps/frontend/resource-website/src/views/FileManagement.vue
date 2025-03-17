<script setup lang="ts">
import yxzqUtils from '@yxzq-web-resource-tools/yxzq-utils-browser'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
/**
 * 显示功能开发中的提示消息
 * @description 使用 Element Plus 的 Message 组件显示警告提示
 * @returns {void}
 */
const handleOpenWaitMessage = () => {
    ElMessage({
        message: '功能开发中，敬请期待',
        type: 'warning',
    })
}
/**
 * 文件类型枚举
 * @enum {string}
 * @description 定义文件搜索的类型选项
 * - ALL: 所有文件
 * - PHOTO: 仅图片文件
 * - AUTO: 自定义文件类型
 */
enum FileType {
    ALL = 'all',
    PHOTO = 'photo',
    AUTO = 'auto',
}
/**
 * 文件类型选择列表项接口
 * @interface FileTypeItem
 * @description 定义文件类型选择器的列表项结构
 * @property {string} label - 显示的文本标签
 * @property {FileType} value - 对应的文件类型枚举值
 */
interface FileTypeItem {
    label: string
    value: FileType
}
//文件类型选择列表
const fileTypeList = ref<FileTypeItem[]>(
    [
        {
            label: 'all',
            value: FileType.ALL
        },
        {
            label: 'photo',
            value: FileType.PHOTO
        },
        {
            label: '自定义',
            value: FileType.AUTO
        }
    ]
)
//当前选中的文件类型
const activeFileType = ref<FileType>(FileType.ALL)
/**
 * 切换当前选中的文件类型
 * @param {FileType} value - 要切换到的文件类型
 * @description 更新 activeFileType 的值，触发文件类型切换
 * @returns {void}
 */
const handleChangeFileType = (value: FileType) => {
    activeFileType.value = value
}
//自定义后缀列表
const autoExtList = ref<string[]>([])
//自定义后缀输入框值
const autoExt = ref<string>('')
/**
 * 添加自定义文件后缀
 * @description 将输入框中的后缀添加到自定义后缀列表中，并清空输入框
 * @throws {void} 如果后缀已存在，则静默返回
 * @returns {void}
 */
const handleAddAutoExt = () => {
    if (autoExtList.value.includes(autoExt.value)) return
    autoExtList.value.push(autoExt.value)
    autoExt.value = ''
}
/**
 * 删除自定义文件后缀
 * @param {string} ext - 要删除的文件后缀
 * @description 从自定义后缀列表中移除指定的后缀
 * @returns {void}
 */
const handleDeleteAutoExt = (ext: string) => {
    autoExtList.value = autoExtList.value.filter((item) => item !== ext)
}
/**
 * 根据当前选中的文件类型搜索文件路径
 * @description 根据不同的文件类型调用 yxzqUtils.getFilePath 获取文件列表：
 * - ALL: 获取所有文件
 * - PHOTO: 获取图片文件
 * - AUTO: 获取自定义后缀的文件
 * @async
 * @returns {Promise<void>}
 */
const handleSearch = () => {
    switch (activeFileType.value) {
        case FileType.ALL:
            yxzqUtils.getFilePath({
                url: import.meta.env.MYAPP_BASE_URL,
                extNameConfig: 'all'
            }).then((res) => {
                filePathList.value = res.files
            })
            break
        case FileType.PHOTO:
            yxzqUtils.getFilePath({
                url: import.meta.env.MYAPP_BASE_URL,
                extNameConfig: 'photo'
            }).then((res) => {
                filePathList.value = res.files
            })
            break
        case FileType.AUTO:
            yxzqUtils.getFilePath({
                url: import.meta.env.MYAPP_BASE_URL,
                extNameConfig: autoExtList.value
            }).then((res) => {
                filePathList.value = res.files
            })
    }
}
//路径列表
const filePathList = ref<string[]>([])
/**
 * 在新标签页中打开指定路径
 * @param {string} path - 要打开的文件路径
 * @description 使用 window.open 在新标签页中打开文件
 * @returns {void}
 */
const handleGoTo = (path: string) => {
    window.open(path)
}
//初始化
onMounted(() => {
    handleSearch()
})
</script>

<template>
    <div class="container">
        <header>
            <h3>文件类型</h3>
            <ul>
                <li v-for="item of fileTypeList" :key="item.label" :class="{ active: activeFileType === item.value }"
                    @click="handleChangeFileType(item.value)">{{
                        item.label }}</li>
            </ul>
            <ul>
                <li v-for="item of autoExtList" :key="item" :class="{ active: activeFileType === FileType.AUTO }">
                    <span> {{ item }}</span>
                    <button class="delete-btn" @click="handleDeleteAutoExt(item)">x</button>
                </li>
            </ul>
            <div class="input-ext input-div">
                <input type="text" v-model="autoExt" placeholder="请输入后缀,如jpg" />
                <button @click="handleAddAutoExt">添加后缀</button>
            </div>
            <div class="input-div">
                <button @click="handleSearch">查找</button>
            </div>
        </header>
        <section class="file-list">
            <ul v-if="filePathList.length">
                <li v-for="item of filePathList" :key="item">
                    <span>{{ item }}</span>
                    <div class="btn-group">
                        <button class="btn delete-btn " @click="handleOpenWaitMessage">删除</button>
                        <button class="btn go-to-btn" @click="handleGoTo(item)">跳转</button>
                    </div>
                </li>
            </ul>
            <div class="empty">文件为空</div>
        </section>
    </div>
</template>

<style lang="less" scoped>
.container {
    flex: 1;
    padding: 20px;
    background-color: #f5f7fa;
    overflow-y: auto;

    header {
        margin-bottom: 24px;

        h3 {
            font-size: 20px;
            color: #2c3e50;
            margin-bottom: 16px;
            font-weight: 600;
        }

        ul {
            width: 100%;
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
            flex-wrap: wrap;

            li {
                width: 120px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                background-color: #fff;
                border-radius: 6px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                cursor: pointer;
                transition: all 0.3s ease;
                color: #606266;
                position: relative;

                @media screen and (max-width: @--first-change-width) {
                    min-width: 80px;
                    flex: 1;
                }

                .delete-btn {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    padding: 0;
                    border-radius: 50%;
                    background-color: #f56c6c;
                    color: white;
                    font-size: 12px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 4px rgba(245, 108, 108, 0.2);

                    &:hover {
                        background-color: #f78989;
                        transform: scale(1.1);
                    }
                }

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    background-color: #ecf5ff;
                    color: #409eff;
                }
            }

            .active {
                background-color: #409eff !important;
                color: #ffffff !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
            }
        }

        .input-ext {
            @media screen and (max-width: @--first-change-width) {
                flex-direction: column;

                input {
                    width: 100%;
                }
            }
        }

        .input-div {
            margin-bottom: 16px;
            display: flex;
            gap: 12px;

            input {
                padding: 8px 12px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                outline: none;
                transition: all 0.3s;
                width: 200px;

                &:focus {
                    border-color: #409eff;
                    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
                }
            }

            button {
                padding: 8px 16px;
                background-color: #409eff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s;

                @media screen and (max-width: @--first-change-width) {
                    flex: 1;
                }

                &:hover {
                    background-color: #66b1ff;
                }

                &:active {
                    background-color: #3a8ee6;
                }
            }
        }
    }

    .file-list {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

        ul {
            li {
                padding: 12px;
                border-bottom: 1px solid #ebeef5;
                color: #606266;
                transition: all 0.3s;
                display: flex;
                justify-content: space-between;
                align-items: center;

                @media screen and (max-width: @--first-change-width) {
                    flex-direction: column;
                }

                span {
                    word-wrap: wrap;
                    word-break: break-all;
                }

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background-color: #f5f7fa;

                    .btn {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .btn-group {
                    display: flex;
                    gap: 10px;
                    margin-left: 10px;
                    min-width: 120px;
                    width: 120px;
                    max-height: 30px;

                    @media screen and (max-width: @--first-change-width) {
                        width: 100%;
                        flex-wrap: wrap;
                        margin-top: 10px;
                        margin-left: 0px;
                    }

                    .btn {
                        padding: 6px 12px;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        opacity: 0.8;
                        transform: translateX(-10px);
                        font-size: 14px;

                        &:hover {
                            transform: translateX(0) scale(1.05);
                        }

                        @media screen and (max-width: @--first-change-width) {
                            flex: 1;
                            transform: translateX(0);
                        }
                    }

                    .delete-btn {
                        background-color: #f56c6c;

                        &:hover {
                            background-color: #f78989;
                        }
                    }

                    .go-to-btn {
                        background-color: #409eff;

                        &:hover {
                            background-color: #66b1ff;
                        }
                    }
                }
            }
        }
        .empty{
            text-align: center;
            color: #606f7b;
            font-size: 16px;
        }
    }
}
</style>
