<script setup lang="ts">
import yxzqUtils from '@yxzq-web-resource-tools/yxzq-utils-browser'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
/**
 * 上传文件对象引用
 * @type {Ref<File | undefined>}
 */
const uploadFile = ref<File>()
/**
 * 是否使用日期作为文件名的类型定义
 * @type {"no" | "yes"}
 */
type useDateType = "no" | "yes"
/**
 * 上传配置接口
 * @interface UploadConfig
 * @property {string} [folderName] - 上传文件夹名称
 * @property {string} [fileName] - 上传文件名
 * @property {string} [url] - 上传请求地址
 * @property {useDateType} [useDate] - 是否使用日期作为文件名
 * @property {string} [ext] - 文件后缀
 */
interface UploadConfig {
    folderName?: string
    fileName?: string
    url?: string
    useDate?: useDateType
    ext?: string
}
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
    uploadConfig.value.ext = ext
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
        yxzqUtils.uploadResource(uploadFile.value, uploadConfig.value).then((res) => {
            ElMessage.success(`${res.message}地址为${res.filePath}`)
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
}
</script>

<template>
    <div class="container">
        <section>
            <div>
                <span class="required">文件</span>
                <label for="file">{{ uploadFile ? uploadFile.name : "click here to add file" }}</label>
                <input type="file" @change="handleChange" id="file">
            </div>
            <div>
                <span>文件夹名</span>
                <input type="text" v-model="uploadConfig.folderName" placeholder="默认值为default,请勿使用中文">
            </div>
            <div>
                <span>文件名</span>
                <input type="text" v-model="uploadConfig.fileName" placeholder="默认值为defaul_name,请勿使用中文">
            </div>
            <div>
                <span>请求地址</span>
                <input type="text" v-model="uploadConfig.url" placeholder="默认值为http://localhost:3100">
            </div>
            <div>
                <span>是否使用日期作为文件名</span>
                <select name="" id="" v-model="uploadConfig.useDate">
                    <option value="yes">是</option>
                    <option value="no">否</option>
                </select>
            </div>
            <div>
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

    @media screen and (max-width: 500px) {
        padding: 10px;
    }

    section {
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

        @media screen and (max-width: 500px) {
            width: 90%;
            padding: 15px;
        }

        div {
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            @media screen and (max-width: 500px) {
                flex-direction: column;
                align-items: flex-start;
                margin-bottom: 15px;
                height: 60px;
            }

            span {
                width: 160px;
                color: #606266;
                font-size: 14px;

                @media screen and (max-width: 500px) {
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

                @media screen and (max-width: 500px) {
                    width: 100%;
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

            @media screen and (max-width: 500px) {
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