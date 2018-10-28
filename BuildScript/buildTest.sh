
echo "*************************  step1:初始化环境变量  *************************"

# 获取工程名称
project_name="B2B2C"

# 指定要打包编译的方式 : Release or Debug (默认是Release)
build_configuration="Release"

cd ..
# 打包脚本文件夹路径
script_path=BuildScript

# 指定输出文件夹路径
export_path=BuildRelease

# 指定输出xcarchive路径
export_archive_path=${export_path}/${project_name}.xcarchive

# 导出ipa所需要的plist文件路径
exportOptionsPlistPath=${script_path}/exportOptionsTest.plist

# 清理输出目录
rm -rf ${export_path}
mkdir ${export_path}

cd ./ios


echo "*************************  step2:开始构建项目  *************************"

xcodebuild clean -workspace ${project_name}.xcodeproj/project.xcworkspace \
-scheme ${project_name} \
-configuration ${build_configuration}

xcodebuild archive -workspace ${project_name}.xcodeproj/project.xcworkspace \
-scheme ${project_name} \
-configuration ${build_configuration} \
-archivePath ../${export_archive_path} \
-sdk iphoneos


echo "*************************  step3:开始导出ipa文件  *************************"
	
xcodebuild  -exportArchive \
-archivePath ../${export_archive_path} \
-exportOptionsPlist ../${exportOptionsPlistPath} \
-exportPath ../${export_path} \
-allowProvisioningUpdates


