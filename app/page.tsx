import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <img
              src="https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb5d5e53ea939d3d539b600bcb2?x-bce-process=image/format,f_auto/quality,Q_70/resize,m_lfit,limit_1,w_536"
              alt="CGCH Logo"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#294778] mb-2">工厂参观预约</h1>
          <p className="text-gray-500">中辉绿建集装箱有限公司</p>
          <p className="text-sm text-gray-400 mt-1">CGCH Container Co., Ltd.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Form />
        </div>

        <div className="text-center mt-8 text-sm text-gray-400">
          <p>提交后将自动生成参观邀请函</p>
        </div>
      </div>
    </main>
  );
}
