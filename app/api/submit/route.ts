import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface FormData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  visitDate: string;
  visitorCount: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    if (
      !data.name ||
      !data.company ||
      !data.email ||
      !data.phone ||
      !data.visitDate ||
      !data.visitorCount
    ) {
      return NextResponse.json({ error: "请填写所有必填字段" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.qiye.aliyun.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/invite?name=${encodeURIComponent(data.name)}&company=${encodeURIComponent(data.company)}&position=${encodeURIComponent(data.position || "")}&date=${encodeURIComponent(data.visitDate)}&count=${encodeURIComponent(data.visitorCount)}`;

    const adminMailOptions = {
      from: `"工厂参观邀请系统" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `[新参观申请] ${data.company} - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #294778;">新客户参观申请</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">姓名</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">公司</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">职位</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.position || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">邮箱</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">手机</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">参观日期</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.visitDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">参观人数</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.visitorCount} 人</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">备注</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.notes || "-"}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">
            <a href="${inviteUrl}" style="background-color: #294778; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">查看邀请函</a>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    if (process.env.SEND_CUSTOMER_CONFIRMATION === "true") {
      const customerMailOptions = {
        from: `"中辉绿建集装箱有限公司" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: `参观邀请确认 - 中辉绿建集装箱有限公司`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #294778;">尊敬的 ${data.name}：</h2>
            <p>感谢您预约参观中辉绿建集装箱有限公司工厂。</p>
            <p><strong>参观日期：</strong>${data.visitDate}</p>
            <p><strong>参观人数：</strong>${data.visitorCount} 人</p>
            <p>请点击下方链接查看您的专属邀请函：</p>
            <p>
              <a href="${inviteUrl}" style="background-color: #294778; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">查看邀请函</a>
            </p>
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              如有任何问题，请联系我们。<br/>
              中辉绿建集装箱有限公司
            </p>
          </div>
        `,
      };
      await transporter.sendMail(customerMailOptions);
    }

    return NextResponse.json({
      success: true,
      message: "提交成功",
      inviteUrl,
    });
  } catch (error) {
    console.error("提交失败:", error);
    return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
  }
}
