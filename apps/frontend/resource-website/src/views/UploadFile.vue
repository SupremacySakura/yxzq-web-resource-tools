<script setup lang="ts">
import yxzqUtils from '@yxzq-web-resource-tools/yxzq-utils-browser'
import type { UploadConfig} from '@yxzq-web-resource-tools/yxzq-utils-browser'
import { onMounted, ref } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
const filesStructure = ref<any[]>([])
/**
 * 上传文件对象引用
 * @type {Ref<File | undefined>}
 */
const uploadFile = ref<File>()
/**
 * 上传配置对象引用
 * @type {Ref<UploadConfig>}
 */
const uploadConfig = ref<UploadConfig>({
    folderName: '',
    fileName: '',
    url: import.meta.env.MYAPP_BASE_URL,
    useDate: 'no',
    ext: ''
})
/**
 * 处理文件选择变更
 * @param {Event} e - 文件选择事件对象
 * @description 获取选中的文件并自动提取文件后缀
 */
const handleChange = (e: any) => {
    uploadFile.value = e.target.files[0]
    // 获取文件后缀名并自动填充
    const fileName = uploadFile.value?.name || ''
    const ext = fileName.split('.').pop() || ''
    const fileNameWithoutExt = fileName.replace(`.${ext}`, '')
    uploadConfig.value.ext = ext
    uploadConfig.value.fileName = fileNameWithoutExt
}
/**
 * 加载选项
 * @type {ElLoadingOptions}
 */
const loadingOption = {
    lock: true,
    text: '上传中...',
    background: 'rgba(0, 0, 0, 0.7)'
}
/**
 * 处理文件上传
 * @description 上传文件并处理响应结果
 * @throws {Error} 上传失败时抛出错误
 * @async
 */
const handleUpload = () => {
    if (uploadFile.value === undefined) {
        ElMessage.error('请选择文件')
        return
    }
    try {
        const loadingInstance = ElLoading.service(loadingOption)
        yxzqUtils.uploadResource(uploadFile.value, uploadConfig.value).then((res) => {
            ElMessage.success(`${res.message}地址为${res.filePath}`)
            uploadFilesStructure()
        }).finally(()=>{
            loadingInstance.close()
        })
    } catch (e) {
        ElMessage.error(`上传失败：${e}`)
    } finally {
        uploadFile.value = undefined
        uploadConfig.value = {
            folderName: '',
            fileName: '',
            url: undefined,
            useDate: 'no',
            ext: ''
        }
    }
}/**
 * 获取并更新文件结构
 * @description 调用 yxzqUtils.getFilesStructure 获取文件结构，并更新 filesStructure 的值
 * @async
 * @returns {Promise<void>}
 */
const uploadFilesStructure = () => {
    yxzqUtils.getFilesStructure({
        url: import.meta.env.MYAPP_BASE_URL
    }).then((res) => {
        filesStructure.value = res.filesStructure
    })
}
onMounted(() => {
    uploadFilesStructure()
})
</script>

<template>
    <div class="container">
        <section class="files-structure">
            <h2 class="title">仓库文件</h2>
            <div v-for="item of filesStructure" :key="item" class="file-folder">
                <span>{{ item.type === 'folder' ? "📁" + item.name : "📄" + item.name }}</span>
                <div class="file-list">
                    <div v-for="subItem of item.children" :key="subItem">{{ subItem.type === 'folder' ? "📁"
                        + subItem.name : "📄" + subItem.name }}</div>
                </div>
            </div>
            <div class="empty" v-if="!filesStructure.length">无任何文件</div>
        </section>
        <section class="upload-file-section">
            <div class="upload-file">
                <span class="required">文件</span>
                <label for="file">{{ uploadFile ? uploadFile.name : "click here to add file" }}</label>
                <input type="file" @change="handleChange" id="file">
            </div>
            <div class="upload-file">
                <span>文件夹名</span>
                <input type="text" v-model="uploadConfig.folderName" placeholder="默认值为default">
            </div>
            <div class="upload-file">
                <span>文件名</span>
                <input type="text" v-model="uploadConfig.fileName" placeholder="默认值为defaul_name">
            </div>
            <div class="upload-file">
                <span>请求地址</span>
                <input type="text" v-model="uploadConfig.url" placeholder="默认值为http://localhost:3100">
            </div>
            <div class="upload-file">
                <span>是否使用日期作为文件名</span>
                <select name="" id="" v-model="uploadConfig.useDate">
                    <option value="yes">是</option>
                    <option value="no">否</option>
                </select>
            </div>
            <div class="upload-file">
                <span>文件后缀</span>
                <input type="text" placeholder="默认值为jpg" v-model="uploadConfig.ext">
            </div>
            <button @click="handleUpload">上传</button>
        </section>
    </div>
</template>

<style lang="less" scoped>
.container {
    flex: 1;
    padding: 20px;
    background-color: #f5f7fa;
    overflow-y: auto;

    @media screen and (max-width: @--first-change-width) {
        padding: 10px;
    }

    .files-structure {
        max-height: 40vh;
        overflow-y: auto;
        cursor: default;
        .title {
            text-align: center;
            margin-bottom: 5px;
        }

        .file-folder {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: start;
            padding: 8px;
            border: 1px solid #e4e7ed;
            border-radius: 4px;
            margin-bottom: 12px;
            transition: all 0.3s;
            max-height: 200px;


            &:hover {
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
                border-color: #c6e2ff;
            }

            >span {
                font-size: 15px;
                font-weight: 500;
                color: #303133;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
            }

            .file-list {
                display: flex;
                flex-direction: column;
                padding-left: 24px;
                align-items: start;
                word-break: break-all;
                overflow-y: auto;

                >div {
                    font-size: 14px;
                    color: #606266;
                    padding: 4px 0;
                    display: flex;
                    align-items: center;
                    transition: all 0.2s;

                    &:hover {
                        color: #409eff;
                        background-color: #f5f7fa;
                    }
                }
            }
        }
        .empty {
            text-align: center;
            color: #606266;
            font-size: 14px;
            margin-top: 10px;
        }
    }

    section {
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;

        @media screen and (max-width: @--first-change-width) {
            width: 90%;
            padding: 15px;
        }

        .upload-file {
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            @media screen and (max-width:@--first-change-width) {
                flex-direction: column;
                align-items: flex-start;
                margin-bottom: 15px;
                height: 60px;
            }

            span {
                width: 160px;
                color: #606266;
                font-size: 14px;

                @media screen and (max-width: @--first-change-width) {
                    width: 100% !important;
                    margin-bottom: 8px;
                    font-size: 13px;
                }
            }

            label,
            input[type="text"],
            select {
                flex: 1;
                height: 36px;
                padding: 0 12px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                color: #606266;
                transition: border-color 0.2s;

                @media screen and (max-width:@--first-change-width) {
                    width: 100%;
                    font-size: 12px;
                }

                &:focus {
                    outline: none;
                    border-color: #409eff;
                }

                &::placeholder {
                    color: #c0c4cc;
                }
            }

            label {
                cursor: pointer;
                line-height: 36px;
                overflow-x: auto;
                overflow-y: hidden;
                scrollbar-width: none;
                -ms-overflow-style: none;

                &::-webkit-scrollbar {
                    display: none;
                }
            }

            input[type="file"] {
                display: none;
            }
        }

        button {
            width: 100%;
            height: 40px;
            background-color: #409eff;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s;

            @media screen and (max-width: @--first-change-width) {
                height: 36px;
                font-size: 13px;
            }

            &:hover {
                background-color: #66b1ff;
            }

            &:active {
                background-color: #3a8ee6;
            }
        }
    }

    .required::after {
        content: "*";
        color: #f56c6c;
        font-size: 16px;
        margin-left: 4px;
    }
}
</style>