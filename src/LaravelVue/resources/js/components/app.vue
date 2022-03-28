<script type="text/javascript">
  window.csrf_token =  "{{ csrf_token() }}"
</script>
<template>
  <div class="wrapper">
    <div class="layout container excess">
      <div class="left-side layout excess">
        <div class="layout nd-class-0">
          <p class="layout nd-class-1">
            Get insights into the big data
          </p>
          <p class="layout nd-class-2">
            Reports
          </p>
          <svg class="layout nd-class-3" fill="none" height="28" preserveaspectratio="none" viewbox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5H8V9H20V5ZM21 14C20.7348 14 20.4804 13.8946 20.2929 13.7071C20.1054 13.5196 20 13.2652 20 13C20 12.7348 20.1054 12.4804 20.2929 12.2929C20.4804 12.1054 20.7348 12 21 12C21.2652 12 21.5196 12.1054 21.7071 12.2929C21.8946 12.4804 22 12.7348 22 13C22 13.2652 21.8946 13.5196 21.7071 13.7071C21.5196 13.8946 21.2652 14 21 14ZM18 21H10V16H18V21ZM21 10H7C6.20435 10 5.44129 10.3161 4.87868 10.8787C4.31607 11.4413 4 12.2044 4 13V19H8V23H20V19H24V13C24 12.2044 23.6839 11.4413 23.1213 10.8787C22.5587 10.3161 21.7956 10 21 10Z" fill="#367BF5"></path>
          </svg>
        </div>
        <div class="layout nd-class-4">
          <p class="layout nd-class-5">
            View your results as Excel file
          </p>
          <p class="layout nd-class-6">
            Results
          </p>
          <svg class="layout nd-class-7" fill="none" height="28" preserveaspectratio="none" viewbox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.78 4L26 8.22L10.44 23.8L2 15.35L6.22 11.13L10.44 15.35L21.78 4ZM21.78 6.8L10.44 18.16L6.22 13.99L4.81 15.35L10.44 20.97L23.19 8.22L21.78 6.8Z" fill="#78909C"></path>
          </svg>
        </div>
        <div class="layout nd-class-8">
          <p class="layout nd-class-9">
            Track your apps across devices
          </p>
          <p class="layout nd-class-10">
            Metrics
          </p>
          <svg class="layout nd-class-11" fill="none" height="28" preserveaspectratio="none" viewbox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4V7.03C18.39 7.52 21 10.42 21 13.95C21 14.85 20.82 15.7 20.5 16.49L23.12 18.02C23.68 16.78 24 15.4 24 13.95C24 8.77 20.05 4.5 15 4ZM14 20.95C12.1435 20.95 10.363 20.2125 9.05025 18.8997C7.7375 17.587 7 15.8065 7 13.95C7 10.42 9.61 7.52 13 7.03V4C7.94 4.5 4 8.76 4 13.95C4 16.6022 5.05357 19.1457 6.92893 21.0211C7.85752 21.9497 8.95991 22.6862 10.1732 23.1888C11.3864 23.6913 12.6868 23.95 14 23.95C17.3 23.95 20.23 22.34 22.05 19.86L19.45 18.33C18.17 19.95 16.21 20.95 14 20.95Z" fill="#78909C"></path>
          </svg>
        </div>
        <div class="layout nd-class-12" v-on:click="submitFile()">
          <div class="layout fon nd-class-13"></div>

          <div class="input__wrapper">
            <input name="file" type="file" ref="file" id="file" class="input input__file file-input" multiple v-on:change="handleFileUpload()"/>
            <label for="file" class="input__file-button">
              <span class="input__file-icon-wrapper">
                <svg class="layout nd-class-14" alt="Выбрать файл" fill="none" height="32" preserveaspectratio="none" viewbox="0 0 33 32" width="33" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.2836 16.8H17.0836V20H15.4836V16.8H12.2836V15.2H15.4836V12H17.0836V15.2H20.2836V16.8ZM16.2836 8C15.233 8 14.1927 8.20693 13.2221 8.60896C12.2515 9.011 11.3696 9.60028 10.6267 10.3431C9.12644 11.8434 8.28358 13.8783 8.28358 16C8.28358 18.1217 9.12644 20.1566 10.6267 21.6569C11.3696 22.3997 12.2515 22.989 13.2221 23.391C14.1927 23.7931 15.233 24 16.2836 24C18.4053 24 20.4401 23.1571 21.9404 21.6569C23.4407 20.1566 24.2836 18.1217 24.2836 16C24.2836 14.9494 24.0767 13.9091 23.6746 12.9385C23.2726 11.9679 22.6833 11.086 21.9404 10.3431C21.1976 9.60028 20.3157 9.011 19.3451 8.60896C18.3744 8.20693 17.3342 8 16.2836 8V8Z" fill="#367BF5"></path>
                </svg>
                <img class="input__file-icon"  width="25"></span>
              <span class="input__file-button-text">
                <p class="layout nd-class-15">
            Add EXCEL</p>
              </span>
            </label>
          </div>
        </div>
      </div>
      <div class="base-side layout excess">
        <div class="nd-class-16">
          <div class="layout excess nd-class-17">
            <div class="layout nd-class-18"></div>
            <p class="layout nd-class-19">
              Table content
            </p>
            <div class="layout nd-class-20"></div>
            <p class="layout nd-class-21">
              Table content
            </p>
            <div class="layout nd-class-22"></div>
            <p class="layout nd-class-23">
              Table content
            </p>
            <div class="layout nd-class-24"></div>
            <p class="layout nd-class-25">
              Table content
            </p>
            <div class="layout nd-class-26"></div>
            <p class="layout nd-class-27">
              Table content
            </p>
            <div class="layout nd-class-28"></div>
            <p class="layout nd-class-29">
              Table content
            </p>
            <div class="layout nd-class-30"></div>
            <p class="layout nd-class-31">
              Table content
            </p>
            <div class="layout nd-class-32"></div>
            <p class="layout nd-class-33">
              Table content
            </p>
            <div class="layout nd-class-34"></div>
            <p class="layout nd-class-35">
              {{ items[3].company }}
            </p>
            <svg class="layout nd-class-36" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 330 1" width="330" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="330" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-37">
              {{ items[2].company }}
            </p>
            <svg class="layout nd-class-38" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 330 1" width="330" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="330" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-39">
              {{ items[1].company }}
            </p>
            <svg class="layout nd-class-40" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 330 1" width="330" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="330" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-41">
              {{ items[0].company }}
            </p>
            <svg class="layout nd-class-42" fill="none" height="2" preserveaspectratio="none" viewbox="0 0 330 2" width="330" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" stroke-width="2" x2="330" y1="1" y2="1"></line>
            </svg>
            <div class="layout nd-class-43">
              <div class="layout nd-class-44"></div>
              <svg class="layout nd-class-45" fill="none" height="6" preserveaspectratio="none" viewbox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.42001 0L4.59001 3.17L7.76001 0L9.18001 1.41L4.59001 6L0.0100098 1.41L1.42001 0Z" fill="#069697"></path></svg><svg class="layout nd-class-46" fill="none" height="6" preserveaspectratio="none" viewbox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.59 2.83L7.76 6L9.17 4.59L4.59 0L0 4.59L1.42 6L4.59 2.83Z" fill="#C6CACC"></path>
            </svg>
              <p class="layout nd-class-47">
                Data
              </p>
            </div>
          </div>
          <div class="layout excess nd-class-48">
            <div class="layout nd-class-49"></div>
            <p class="layout nd-class-50">
              Table content
            </p>
            <div class="layout nd-class-51"></div>
            <p class="layout nd-class-52">
              Table content
            </p>
            <div class="layout nd-class-53"></div>
            <p class="layout nd-class-54">
              Table content
            </p>
            <div class="layout nd-class-55"></div>
            <p class="layout nd-class-56">
              Table content
            </p>
            <div class="layout nd-class-57"></div>
            <p class="layout nd-class-58">
              Table content
            </p>
            <div class="layout nd-class-59"></div>
            <p class="layout nd-class-60">
              Table content
            </p>
            <div class="layout nd-class-61"></div>
            <p class="layout nd-class-62">
              Table content
            </p>
            <div class="layout nd-class-63"></div>
            <p class="layout nd-class-64">
              Table content
            </p>
            <div class="layout nd-class-65"></div>
            <p class="layout nd-class-66">
              {{ Number(items[3].forecast_ooil_data1) + Number(items[3].forecast_ooil_data2) }}
            </p>
            <svg class="layout nd-class-67" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-68">
              {{ Number(items[2].forecast_ooil_data1) + Number(items[2].forecast_ooil_data2) }}
            </p>
            <svg class="layout nd-class-69" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-70">
              {{ Number(items[1].forecast_ooil_data1) + Number(items[1].forecast_ooil_data2) }}
            </p>
            <svg class="layout nd-class-71" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-72">
              {{ Number(items[0].fact_oliq_data1) + Number(items[0].fact_oliq_data2) }}
            </p>
            <svg class="layout nd-class-73" fill="none" height="2" preserveaspectratio="none" viewbox="0 0 118 2" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" stroke-width="2" x2="118" y1="1" y2="1"></line>
            </svg>
            <p class="layout nd-class-74">
              Summary1
            </p>
          </div>
          <div class="layout excess nd-class-75">
            <div class="layout nd-class-76"></div>
            <p class="layout nd-class-77">
              Table content
            </p>
            <div class="layout nd-class-78"></div>
            <p class="layout nd-class-79">
              Table content
            </p>
            <div class="layout nd-class-80"></div>
            <p class="layout nd-class-81">
              Table content
            </p>
            <div class="layout nd-class-82"></div>
            <p class="layout nd-class-83">
              Table content
            </p>
            <div class="layout nd-class-84"></div>
            <p class="layout nd-class-85">
              Table content
            </p>
            <div class="layout nd-class-86"></div>
            <p class="layout nd-class-87">
              Table content
            </p>
            <div class="layout nd-class-88"></div>
            <p class="layout nd-class-89">
              Table content
            </p>
            <div class="layout nd-class-90"></div>
            <p class="layout nd-class-91">
              Table content
            </p>
            <div class="layout nd-class-92"></div>
            <p class="layout nd-class-93">

            </p>
            <svg class="layout nd-class-94" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-95">

            </p>
            <svg class="layout nd-class-96" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-97">

            </p>
            <svg class="layout nd-class-98" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-99">

            </p>
            <svg class="layout nd-class-100" fill="none" height="2" preserveaspectratio="none" viewbox="0 0 118 2" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" stroke-width="2" x2="118" y1="1" y2="1"></line>
            </svg>
            <p class="layout nd-class-101">

            </p>
          </div>
          <div class="layout excess nd-class-102">
            <div class="layout nd-class-103"></div>
            <p class="layout nd-class-104">
              Table content
            </p>
            <div class="layout nd-class-105"></div>
            <p class="layout nd-class-106">
              Table content
            </p>
            <div class="layout nd-class-107"></div>
            <p class="layout nd-class-108">
              Table content
            </p>
            <div class="layout nd-class-109"></div>
            <p class="layout nd-class-110">
              Table content
            </p>
            <div class="layout nd-class-111"></div>
            <p class="layout nd-class-112">
              Table content
            </p>
            <div class="layout nd-class-113"></div>
            <p class="layout nd-class-114">
              Table content
            </p>
            <div class="layout nd-class-115"></div>
            <p class="layout nd-class-116">
              Table content
            </p>
            <div class="layout nd-class-117"></div>
            <p class="layout nd-class-118">
              Table content
            </p>
            <div class="layout nd-class-119"></div>
            <p class="layout nd-class-120">
              {{ Number(items[3].fact_ooil_data1) + Number(items[3].fact_ooil_data2) }}
            </p>
            <svg class="layout nd-class-121" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-122">
              {{ Number(items[2].fact_ooil_data1) + Number(items[2].fact_ooil_data2) }}
            </p>
            <svg class="layout nd-class-123" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-124">
              {{ Number(items[1].fact_ooil_data1) + Number(items[1].fact_ooil_data2) }}
            </p>
            <svg class="layout nd-class-125" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-126">
              {{ Number(items[0].fact_ooil_data1) + Number(items[0].fact_ooil_data2) }}
            </p>
            <svg class="layout nd-class-127" fill="none" height="2" preserveaspectratio="none" viewbox="0 0 118 2" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" stroke-width="2" x2="118" y1="1" y2="1"></line>
            </svg>
            <p class="layout nd-class-128">
              Summary2
            </p>
          </div>
          <div class="layout excess nd-class-129">
            <div class="layout nd-class-130"></div>
            <p class="layout nd-class-131">
              Table content
            </p>
            <div class="layout nd-class-132"></div>
            <p class="layout nd-class-133">
              Table content
            </p>
            <div class="layout nd-class-134"></div>
            <p class="layout nd-class-135">
              Table content
            </p>
            <div class="layout nd-class-136"></div>
            <p class="layout nd-class-137">
              Table content
            </p>
            <div class="layout nd-class-138"></div>
            <p class="layout nd-class-139">
              Table content
            </p>
            <div class="layout nd-class-140"></div>
            <p class="layout nd-class-141">
              Table content
            </p>
            <div class="layout nd-class-142"></div>
            <p class="layout nd-class-143">
              Table content
            </p>
            <div class="layout nd-class-144"></div>
            <p class="layout nd-class-145">
              Table content
            </p>
            <div class="layout nd-class-146"></div>
            <p class="layout nd-class-147">
              {{ Number(items[3].forecast_oliq_data1) + Number(items[3].forecast_oliq_data2) }}
            </p>
            <svg class="layout nd-class-148" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-149">
              {{ Number(items[2].forecast_oliq_data1) + Number(items[2].forecast_oliq_data2) }}
            </p>
            <svg class="layout nd-class-150" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-151">
              {{ Number(items[1].forecast_oliq_data1) + Number(items[1].forecast_oliq_data2) }}
            </p>
            <svg class="layout nd-class-152" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-153">
              {{ Number(items[0].forecast_oliq_data1) + Number(items[0].forecast_oliq_data2) }}
            </p>
            <svg class="layout nd-class-154" fill="none" height="2" preserveaspectratio="none" viewbox="0 0 118 2" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" stroke-width="2" x2="118" y1="1" y2="1"></line>
            </svg>
            <p class="layout nd-class-155">
              Summary3
            </p>
          </div>
          <div class="layout excess nd-class-156">
            <div class="layout nd-class-157"></div>
            <p class="layout nd-class-158">
              Table content
            </p>
            <div class="layout nd-class-159"></div>
            <p class="layout nd-class-160">
              Table content
            </p>
            <div class="layout nd-class-161"></div>
            <p class="layout nd-class-162">
              Table content
            </p>
            <div class="layout nd-class-163"></div>
            <p class="layout nd-class-164">
              Table content
            </p>
            <div class="layout nd-class-165"></div>
            <p class="layout nd-class-166">
              Table content
            </p>
            <div class="layout nd-class-167"></div>
            <p class="layout nd-class-168">
              Table content
            </p>
            <div class="layout nd-class-169"></div>
            <p class="layout nd-class-170">
              Table content
            </p>
            <div class="layout nd-class-171"></div>
            <p class="layout nd-class-172">
              Table content
            </p>
            <div class="layout nd-class-173"></div>
            <p class="layout nd-class-174">
              {{ Number(items[3].forecast_ooil_data1) + Number(items[3].forecast_ooil_data2) }}
            </p>
            <svg class="layout nd-class-175" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-176">
              {{ Number(items[2].forecast_ooil_data1) + Number(items[2].forecast_ooil_data2) }}
            </p>
            <svg class="layout nd-class-177" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-178">
              {{ Number(items[1].forecast_ooil_data1) + Number(items[1].forecast_ooil_data2) }}
            </p>
            <svg class="layout nd-class-179" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 118 1" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" x2="118" y1="0.5" y2="0.5"></line>
            </svg>
            <p class="layout nd-class-180">
              {{ Number(items[0].forecast_ooil_data1) + Number(items[0].forecast_ooil_data2) }}
            </p>
            <svg class="layout nd-class-181" fill="none" height="2" preserveaspectratio="none" viewbox="0 0 118 2" width="118" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#E3E5E6" stroke-width="2" x2="118" y1="1" y2="1"></line>
            </svg>
            <p class="layout nd-class-182">
              Summary4
            </p>
          </div>
        </div>
        <svg class="layout nd-class-183" fill="none" height="32" preserveaspectratio="xMidYMid meet" viewbox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#F7F9FA" height="32" rx="4" width="32"></rect>
          <path d="M12 20.5714H20V19.4286H12V20.5714ZM20 14.2857H17.7143V10.8571H14.2857V14.2857H12L16 18.2857L20 14.2857Z" fill="#78909C"></path></svg><svg class="layout nd-class-184" fill="none" height="32" preserveaspectratio="xMidYMid meet" viewbox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#F7F9FA" height="32" rx="4" width="32"></rect>
        <path d="M19.4285 10.8571H12.5714V13.1429H19.4285V10.8571ZM19.9999 16C19.8484 16 19.703 15.9398 19.5959 15.8326C19.4887 15.7255 19.4285 15.5801 19.4285 15.4286C19.4285 15.277 19.4887 15.1317 19.5959 15.0245C19.703 14.9174 19.8484 14.8571 19.9999 14.8571C20.1515 14.8571 20.2968 14.9174 20.404 15.0245C20.5112 15.1317 20.5714 15.277 20.5714 15.4286C20.5714 15.5801 20.5112 15.7255 20.404 15.8326C20.2968 15.9398 20.1515 16 19.9999 16ZM18.2856 20H13.7142V17.1429H18.2856V20ZM19.9999 13.7143H11.9999C11.5453 13.7143 11.1092 13.8949 10.7877 14.2164C10.4663 14.5379 10.2856 14.9739 10.2856 15.4286V18.8571H12.5714V21.1429H19.4285V18.8571H21.7142V15.4286C21.7142 14.9739 21.5336 14.5379 21.2121 14.2164C20.8906 13.8949 20.4546 13.7143 19.9999 13.7143Z" fill="#78909C"></path>
      </svg>
        <p class="layout nd-class-185">
          Dashboard
        </p>
        <div class="layout nd-class-201">
          <div class="layout nd-class-202">
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
          </div>
          <div class="nd-class-203">
            <p class="layout nd-class-204">
              Aug 21, 2021 · Sep 21 2021
            </p>
          </div>
          <svg class="nd-class-205" fill="none" height="24" preserveaspectratio="none" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9L12 14L17 9H7Z" fill="#78909C"></path>
          </svg>
        </div>
        <div class="layout nd-class-206">
          <div class="layout nd-class-207"></div>
          <div class="nd-class-208">
            <p class="layout nd-class-209">
              Search...
            </p>
          </div>
        </div>
        <div class="layout nd-class-210">
          <div class="layout nd-class-211"></div>
          <div class="nd-class-212">
            <p class="layout nd-class-213"></p>
          </div>
        </div>
        <div class="layout nd-class-214">
          <div class="layout nd-class-215"></div>
          <div class="nd-class-216">
            <p class="layout nd-class-217"></p>
          </div>
        </div>
        <div class="layout nd-class-218">
          <div class="layout nd-class-219"></div>
          <div class="nd-class-220">
            <p class="layout nd-class-221"></p>
          </div>
        </div>
        <div class="layout nd-class-222">
          <div class="layout nd-class-223"></div>
          <div class="nd-class-224">
            <p class="layout nd-class-225"></p>
          </div>
        </div>
        <div class="layout nd-class-226">
          <div class="layout nd-class-227"></div>
          <div class="nd-class-228">
            <p class="layout nd-class-229"></p>
          </div>
        </div>
      </div>
      <div class="menu-top layout excess fon">
        <svg class="layout nd-class-230" fill="none" height="1" preserveaspectratio="none" viewbox="0 0 1440 1" width="1440" xmlns="http://www.w3.org/2000/svg">
          <line stroke="#E3E5E6" stroke-dasharray="5 2" x2="1440" y1="0.5" y2="0.5"></line>
        </svg>
        <div class="layout nd-class-231">
          <div class="layout excess nd-class-232"></div>
          <div class="layout excess nd-class-233">
            <p class="layout nd-class-234">
              Configure
            </p>
          </div>
          <div class="layout excess nd-class-235">
            <p class="layout nd-class-236">
              My campaigns
            </p>
          </div>
          <div class="layout excess fon nd-class-237">
            <div class="layout nd-class-238"></div>
            <p class="layout nd-class-239">
              Analyze
            </p>
          </div>
        </div>
      </div>
      <div class="dashboard-head">
        <div class="dashboard-head wrapper-1 layout">
          <div class="dashboard-head layout fon wrapper-2 "></div>
          <div class="layout logo-box">
            <div class="layout logo-shadow fon"></div>
            <p class="dashboard-name layout">
              Dashboard
            </p>
            <p class="dashboard-d layout">
              D
            </p>
          </div>
          <div class="layout canvas-wrapper" style="background-image: url('http://0.0.0.0/images/users/Male.png');">
            <div class="canvas-message">
            <pre>
Failed to transform RECTANGLE Fernando Pidrilio
ReferenceError: OffscreenCanvas is not defined</pre>
            </div>
          </div>
          <div class="upgrade-wrapper">
            <div class="layout upgrade-wrapper-shadow">
              <div class="layout upgrade-wrapper-style fon"></div>
              <p class="layout upgrade-paragraph">
                upgrade
              </p>
              <div class="nd-class-240"></div>
              <div class="nd-class-241"></div>
            </div>
          </div>
        </div>
        <div class="layout nd-class-242">
          <div class="layout nd-class-243"></div>
          <p class="layout nd-class-244">
            Help
          </p>
          <div class="nd-class-245"></div>
          <svg class="nd-class-246" fill="none" height="28" preserveaspectratio="xMidYMid meet" viewbox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.07 13.25L16.17 14.17C15.45 14.89 15 15.5 15 17H13V16.5C13 15.39 13.45 14.39 14.17 13.67L15.41 12.41C15.78 12.05 16 11.55 16 11C16 9.89 15.1 9 14 9C13.4696 9 12.9609 9.21071 12.5858 9.58579C12.2107 9.96086 12 10.4696 12 11H10C10 9.93913 10.4214 8.92172 11.1716 8.17157C11.9217 7.42143 12.9391 7 14 7C15.0609 7 16.0783 7.42143 16.8284 8.17157C17.5786 8.92172 18 9.93913 18 11C18 11.88 17.64 12.67 17.07 13.25ZM15 21H13V19H15V21ZM14 4C12.6868 4 11.3864 4.25866 10.1732 4.7612C8.95991 5.26375 7.85752 6.00035 6.92893 6.92893C5.05357 8.8043 4 11.3478 4 14C4 16.6522 5.05357 19.1957 6.92893 21.0711C7.85752 21.9997 8.95991 22.7362 10.1732 23.2388C11.3864 23.7413 12.6868 24 14 24C16.6522 24 19.1957 22.9464 21.0711 21.0711C22.9464 19.1957 24 16.6522 24 14C24 8.47 19.5 4 14 4Z" fill="#C6CACC"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const default_layout = "default";
  import axios from 'axios';

  export default {
    computed: {},
    data() {
        return {
            file: '',
            csrf_token: document.head.querySelector('meta[name="csrf-token"]').content,
            items: [],
        }
    },
    async created() {
      await this.fetchItems(true);
    },
    methods: {
      submitFile(){
        let formData = new FormData();
        formData.append('file', this.file);
        axios.post( '/send-exel-file',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': this.csrf_token,
              }
            }
        ).then(function(){
          console.log('SUCCESS!!');
        })
            .catch(function(){
              console.log('FAILURE!!');
            });
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
      async fetchItems() {
        var params = {};

          let rand = Math.random() * 1000;
          const res = await  axios.get(`/dashboard-get-items?u=`+ rand +``, {params: params});

          this.items = res.data;
        console.log(res.data);
      },
    }
  };
  </script>
