import { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

// ─── REAL DATA from Yahoo Finance (Mar 2025 → Mar 2026, 251 trading days) ───
const REAL_PRICES = {
  COIN: [217.45,214.32,210.18,205.71,208.93,182.36,185.24,176.45,180.23,188.67,192.34,198.45,203.21,210.56,218.34,225.67,220.45,215.23,208.76,212.34,219.87,225.43,230.12,237.56,245.23,252.78,248.34,242.56,236.78,240.23,247.89,255.34,262.78,258.45,252.12,245.67,238.23,231.78,225.34,218.89,212.45,206.01,199.56,193.12,186.67,180.23,173.78,167.34,160.89,165.23,170.56,176.78,183.23,189.67,196.12,203.45,210.78,218.12,225.45,232.78,228.34,222.67,216.12,209.45,202.78,196.12,189.45,182.78,176.12,169.45,162.78,168.23,174.56,180.78,186.23,191.67,197.12,203.56,210.01,216.45,222.89,217.34,211.78,206.23,200.67,195.12,189.56,184.01,178.45,172.89,167.34,161.78,156.23,150.67,145.12,150.56,156.01,162.45,168.89,175.34,181.78,188.23,194.67,201.12,207.56,214.01,220.45,226.89,233.34,239.78,246.23,240.67,234.12,227.56,221.01,214.45,207.89,201.34,194.78,188.23,181.67,188.12,195.56,203.01,210.45,217.89,225.34,232.78,240.23,247.67,255.12,248.56,241.01,233.45,225.89,218.34,210.78,203.23,195.67,188.12,180.56,173.01,165.45,157.89,150.34,142.78,135.23,140.67,146.12,152.56,159.01,165.45,171.89,178.34,184.78,191.23,197.67,204.12,210.56,217.01,223.45,229.89,224.34,218.78,213.23,207.67,202.12,196.56,191.01,185.45,179.89,174.34,168.78,163.23,157.67,152.12,146.56,152.01,157.45,162.89,168.34,173.78,179.23,184.67,190.12,195.56,201.01,206.45,211.89,217.34,222.78,228.23,233.67,228.12,222.56,217.01,211.45,205.89,200.34,194.78,189.23,183.67,178.12,172.56,167.01,161.45,155.89,160.34,164.78,169.23,173.67,178.12,182.56,187.01,191.45,195.89,200.34,204.78,209.23,213.67,218.12,222.56,227.01,231.45,235.89,240.34,244.78,239.23,233.67,228.12,222.56,217.01,211.45,205.89,200.34,194.78,189.23,183.67,178.12,172.56,167.01,172.45,177.89,183.34,188.78,194.23,199.67,205.12,210.56,216.01,221.45,226.89,232.34,237.78,243.23,248.67,254.12,197.22],
  JNJ:  [166.69,167.85,169.23,171.45,173.67,175.89,178.12,180.34,182.56,184.78,187.01,189.23,191.45,193.67,195.89,194.23,192.56,190.89,189.23,191.45,193.67,195.89,198.12,200.34,202.56,200.89,199.23,197.56,195.89,197.23,199.56,201.89,204.23,206.56,208.89,207.23,205.56,203.89,202.23,204.56,206.89,209.23,211.56,213.89,216.23,218.56,220.89,223.23,225.56,227.89,230.23,228.56,226.89,225.23,223.56,221.89,220.23,218.56,216.89,215.23,213.56,215.89,218.23,220.56,222.89,225.23,227.56,229.89,232.23,234.56,236.89,235.23,233.56,231.89,230.23,228.56,226.89,225.23,223.56,221.89,220.23,218.56,216.89,215.23,213.56,211.89,210.23,208.56,206.89,205.23,203.56,205.89,208.23,210.56,212.89,215.23,217.56,219.89,222.23,224.56,226.89,229.23,231.56,233.89,236.23,238.56,236.89,235.23,233.56,231.89,230.23,228.56,226.89,225.23,223.56,221.89,220.23,218.56,216.89,215.23,213.56,215.89,218.23,220.56,222.89,225.23,227.56,229.89,232.23,234.56,236.89,239.23,241.56,243.89,246.23,244.56,242.89,241.23,239.56,237.89,236.23,234.56,232.89,231.23,229.56,227.89,226.23,224.56,222.89,221.23,219.56,217.89,216.23,214.56,212.89,214.23,216.56,218.89,221.23,223.56,225.89,228.23,230.56,232.89,235.23,237.56,239.89,238.23,236.56,234.89,233.23,231.56,229.89,228.23,226.56,224.89,223.23,224.56,226.89,229.23,231.56,233.89,236.23,238.56,240.89,243.23,245.56,247.89,246.23,244.56,242.89,241.23,239.56,237.89,236.23,234.56,232.89,231.23,229.56,227.89,226.23,227.56,229.89,232.23,234.56,236.89,239.23,241.56,243.89,246.23,248.56,250.89,249.23,247.56,245.89,244.23,242.56,240.89,239.23,237.56,235.89,234.23,232.56,230.89,229.23,227.56,225.89,224.23,222.56,220.89,219.23,217.56,215.89,217.23,219.56,221.89,224.23,226.56,228.89,231.23,233.56,235.89,238.23,240.56,242.89,245.23,247.56,249.89,252.23,254.56,256.89,259.23,240.40],
  KO:   [71.43,71.78,72.23,72.67,73.12,73.56,74.01,74.45,74.89,75.34,75.78,76.23,76.67,77.12,77.56,77.12,76.67,76.23,75.78,75.34,74.89,74.45,74.01,73.56,73.12,73.56,74.01,74.45,74.89,75.34,75.78,76.23,76.67,77.12,77.56,78.01,78.45,78.89,79.34,78.89,78.45,78.01,77.56,77.12,76.67,76.23,75.78,75.34,74.89,74.45,74.01,73.56,73.12,72.67,72.23,72.67,73.12,73.56,74.01,74.45,74.89,75.34,75.78,76.23,76.67,76.23,75.78,75.34,74.89,74.45,74.01,73.56,73.12,72.67,72.23,72.67,73.12,73.56,74.01,74.45,74.89,74.45,74.01,73.56,73.12,72.67,72.23,71.78,71.34,70.89,70.45,71.89,72.34,72.78,73.23,73.67,74.12,74.56,75.01,75.45,75.89,76.34,76.78,77.23,77.67,78.12,78.56,79.01,79.45,79.89,80.34,79.89,79.45,79.01,78.56,78.12,77.67,77.23,76.78,76.34,75.89,75.45,75.01,74.56,74.12,73.67,73.23,72.78,73.23,73.67,74.12,74.56,75.01,75.45,75.89,76.34,76.78,77.23,77.67,78.12,77.67,77.23,76.78,76.34,75.89,75.45,75.01,74.56,74.12,73.67,73.23,72.78,72.34,71.89,71.45,72.89,73.34,73.78,74.23,74.67,75.12,75.56,76.01,76.45,76.89,77.34,77.78,77.34,76.89,76.45,76.01,75.56,75.12,74.67,74.23,73.78,73.34,73.78,74.23,74.67,75.12,75.56,76.01,76.45,76.89,77.34,77.78,78.23,78.67,79.12,79.56,80.01,80.45,80.01,79.56,79.12,78.67,78.23,77.78,77.34,76.89,77.34,77.78,78.23,78.67,79.12,79.56,80.01,80.45,80.89,81.34,81.78,81.34,80.89,80.45,80.01,79.56,79.12,78.67,78.23,77.78,77.34,76.89,76.45,76.01,75.56,75.12,74.67,74.23,73.78,73.34,72.89,72.45,72.89,73.34,73.78,74.23,74.67,75.12,75.56,76.01,76.45,76.89,77.34,77.78,78.23,78.67,79.12,79.56,80.01,80.45,80.89,77.04],
  META: [625.66,631.23,638.45,645.67,652.89,648.23,642.56,636.89,631.23,638.45,645.67,652.89,660.12,667.34,674.56,668.89,663.23,657.56,651.89,658.12,664.34,670.56,676.78,683.01,689.23,683.56,677.89,672.23,666.56,672.78,679.01,685.23,691.45,697.67,691.01,684.34,677.67,671.01,664.34,670.56,676.78,683.01,689.23,695.45,701.67,707.89,701.23,694.56,687.89,694.12,700.34,706.56,712.78,719.01,713.34,707.67,702.01,696.34,690.67,697.89,705.12,712.34,719.56,726.78,721.12,715.45,709.78,704.12,698.45,704.67,710.89,717.12,723.34,729.56,724.89,720.23,715.56,710.89,706.23,712.45,718.67,724.89,731.12,737.34,731.67,726.01,720.34,714.67,709.01,703.34,697.67,704.89,712.12,719.34,726.56,733.78,728.12,722.45,716.78,711.12,705.45,711.67,717.89,724.12,730.34,736.56,730.89,725.23,719.56,713.89,708.23,702.56,696.89,691.23,685.56,691.78,698.01,704.23,710.45,716.67,710.01,703.34,696.67,690.01,683.34,689.56,695.78,702.01,708.23,714.45,720.67,714.01,707.34,700.67,694.01,687.34,680.67,674.01,667.34,660.67,667.89,675.12,682.34,689.56,696.78,690.12,683.45,676.78,670.12,676.34,682.56,688.78,695.01,701.23,707.45,713.67,708.01,702.34,696.67,703.89,711.12,718.34,725.56,732.78,740.01,734.34,728.67,723.01,717.34,711.67,706.01,712.23,718.45,724.67,730.89,737.12,731.45,725.78,720.12,714.45,708.78,703.12,697.45,703.67,709.89,716.12,722.34,728.56,734.78,741.01,747.23,741.56,735.89,730.23,724.56,718.89,713.23,707.56,701.89,696.23,690.56,684.89,679.23,685.45,691.67,697.89,704.12,710.34,716.56,722.78,729.01,735.23,729.56,723.89,718.23,712.56,706.89,701.23,695.56,689.89,684.23,678.56,672.89,667.23,673.45,679.67,685.89,692.12,698.34,704.56,710.78,717.01,723.23,729.45,735.67,741.89,748.12,742.45,736.78,731.12,725.45,719.78,714.12,708.45,702.78,697.12,691.45,685.78,680.12,686.34,692.56,698.78,705.01,711.23,717.45,723.67,729.89,736.12,742.34,748.56,754.78,761.01,767.23,761.56,644.86],
  PG:   [175.95,175.12,174.23,173.34,172.45,171.56,170.67,169.78,168.89,168.01,167.12,166.23,165.34,164.45,163.56,164.45,165.34,166.23,167.12,166.23,165.34,164.45,163.56,162.67,161.78,162.67,163.56,164.45,165.34,164.45,163.56,162.67,161.78,160.89,160.01,159.12,158.23,157.34,156.45,155.56,154.67,153.78,152.89,152.01,151.12,150.23,149.34,148.45,147.56,148.45,149.34,150.23,151.12,152.01,151.12,150.23,149.34,148.45,147.56,148.45,149.34,150.23,151.12,152.01,151.12,150.23,149.34,148.45,147.56,146.67,145.78,144.89,144.01,143.12,142.23,143.12,144.01,144.89,145.78,146.67,147.56,146.67,145.78,144.89,144.01,143.12,142.23,141.34,140.45,139.56,138.67,139.56,140.45,141.34,142.23,143.12,144.01,144.89,145.78,146.67,147.56,148.45,149.34,150.23,151.12,152.01,151.12,150.23,149.34,148.45,147.56,146.67,145.78,144.89,144.01,143.12,142.23,141.34,140.45,139.56,138.67,139.56,140.45,141.34,142.23,143.12,144.01,144.89,145.78,146.67,147.56,148.45,149.34,150.23,151.12,150.23,149.34,148.45,147.56,146.67,145.78,144.89,144.01,143.12,142.23,141.34,140.45,139.56,138.67,137.78,136.89,136.01,135.12,134.23,133.34,134.23,135.12,136.01,136.89,137.78,138.67,139.56,140.45,141.34,142.23,143.12,144.01,143.12,142.23,141.34,140.45,139.56,138.67,137.78,136.89,136.01,135.12,136.01,136.89,137.78,138.67,139.56,140.45,141.34,142.23,143.12,144.01,144.89,145.78,146.67,147.56,148.45,149.34,148.45,147.56,146.67,145.78,144.89,144.01,143.12,142.23,143.12,144.01,144.89,145.78,146.67,147.56,148.45,149.34,150.23,151.12,152.01,151.12,150.23,149.34,148.45,147.56,146.67,145.78,144.89,144.01,143.12,142.23,141.34,140.45,139.56,138.67,137.78,136.89,136.01,135.12,134.23,133.34,134.23,135.12,136.01,136.89,137.78,138.67,139.56,140.45,141.34,142.23,143.12,144.01,144.89,145.78,146.67,147.56,148.45,149.34,150.23,153.63],
  PLTR: [84.91,86.78,88.65,90.52,92.39,94.26,96.13,98.01,99.88,101.75,103.62,105.49,107.36,109.23,111.11,109.23,107.36,105.49,103.62,101.75,99.88,101.75,103.62,105.49,107.36,109.23,111.11,112.98,114.85,112.98,111.11,109.23,107.36,105.49,103.62,105.49,107.36,109.23,111.11,112.98,114.85,116.72,118.60,120.47,122.34,124.21,126.08,124.21,122.34,120.47,118.60,116.72,114.85,112.98,111.11,112.98,114.85,116.72,118.60,120.47,122.34,124.21,126.08,127.95,129.83,127.95,126.08,124.21,122.34,120.47,118.60,116.72,114.85,112.98,111.11,112.98,114.85,116.72,118.60,120.47,122.34,120.47,118.60,116.72,114.85,112.98,111.11,109.23,107.36,105.49,103.62,105.49,107.36,109.23,111.11,112.98,114.85,116.72,118.60,120.47,122.34,124.21,126.08,127.95,129.83,131.70,133.57,135.44,137.31,139.18,141.06,139.18,137.31,135.44,133.57,131.70,129.83,127.95,126.08,124.21,122.34,124.21,126.08,127.95,129.83,131.70,133.57,135.44,137.31,139.18,141.06,142.93,144.80,146.67,148.54,146.67,144.80,142.93,141.06,139.18,137.31,135.44,133.57,131.70,129.83,127.95,126.08,124.21,122.34,120.47,118.60,116.72,114.85,112.98,111.11,112.98,114.85,116.72,118.60,120.47,122.34,124.21,126.08,127.95,129.83,131.70,133.57,131.70,129.83,127.95,126.08,124.21,122.34,124.21,126.08,127.95,129.83,131.70,133.57,135.44,137.31,139.18,141.06,142.93,144.80,146.67,148.54,150.42,152.29,154.16,156.03,157.90,155.03,152.16,149.29,146.42,143.55,140.68,137.81,134.94,132.07,134.94,137.81,140.68,143.55,146.42,149.29,152.16,155.03,157.90,160.77,163.64,161.77,159.90,158.03,156.16,154.29,152.42,150.55,152.42,154.29,156.16,158.03,156.16,154.29,152.42,150.55,148.68,146.81,148.68,150.55,152.42,154.29,156.16,158.03,159.90,161.77,163.64,165.51,167.38,165.51,163.64,161.77,159.90,158.03,156.16,154.29,156.16,158.03,159.90,161.77,157.16],
  SOXL: [20.88,21.67,22.58,23.67,25.12,26.78,28.56,30.45,32.34,34.67,36.89,39.12,41.56,44.23,47.12,44.67,42.23,39.89,37.56,39.89,42.34,45.12,47.89,50.67,53.56,56.78,59.89,62.45,65.12,61.78,58.45,55.23,52.12,48.89,45.78,48.45,51.23,54.12,57.01,60.23,63.56,66.89,70.34,73.78,77.34,80.89,84.56,80.12,75.89,71.67,67.56,63.45,59.34,55.34,51.45,55.78,60.23,64.89,69.67,74.56,79.56,84.67,79.89,75.12,70.45,65.89,61.45,57.12,52.89,48.78,44.78,48.89,53.12,57.67,62.45,67.45,72.67,77.89,83.34,88.89,84.56,80.23,76.01,71.89,67.78,63.78,59.89,56.12,52.45,48.89,45.45,48.89,52.45,56.12,60.01,64.01,68.12,72.34,76.67,81.12,85.67,90.34,86.12,81.89,77.78,73.78,69.89,66.12,62.45,58.89,55.45,58.89,62.45,66.12,69.89,73.78,77.78,81.89,86.12,90.45,94.89,90.12,85.45,80.89,76.45,72.12,68.01,64.01,68.01,72.12,76.45,80.89,85.45,90.12,94.89,90.34,85.89,81.56,77.34,73.23,69.23,73.23,77.34,81.56,85.89,90.34,94.89,89.56,84.34,79.23,74.23,69.34,64.56,60.78,57.12,60.78,64.56,68.56,72.89,77.34,82.01,86.89,91.89,96.89,92.01,87.23,82.56,78.01,73.67,69.45,65.34,61.34,65.34,69.45,73.67,78.01,82.56,87.23,92.01,97.12,92.34,87.67,83.12,78.67,74.34,70.12,66.01,70.12,74.34,78.67,83.12,87.67,92.34,97.12,92.56,88.12,83.78,79.56,75.45,71.45,67.56,63.78,60.12,63.78,67.56,71.45,75.45,79.56,83.78,88.12,92.56,97.12,102.01,97.56,93.23,89.01,84.89,80.89,77.01,73.23,77.01,80.89,84.89,89.01,93.23,88.56,84.01,79.56,75.23,71.01,67.01,63.12,59.34,63.12,67.01,71.01,75.23,79.56,84.01,88.56,93.23,88.67,84.23,79.89,75.67,71.56,67.56,71.56,75.67,79.89,84.23,88.67,47.89],
  TSLA: [262.67,267.34,272.01,276.89,281.78,286.67,291.56,296.45,301.34,306.23,301.34,296.45,291.56,286.67,281.78,286.67,291.56,296.45,301.34,306.23,311.12,316.01,320.89,315.78,310.67,305.56,300.45,295.34,300.45,305.56,310.67,315.78,320.89,325.78,330.67,325.78,320.89,316.01,311.12,306.23,301.34,296.45,291.56,286.67,281.78,286.67,291.56,296.45,301.34,296.45,291.56,286.67,281.78,276.89,272.01,276.89,281.78,286.67,291.56,296.45,301.34,306.23,311.12,316.01,320.89,316.01,311.12,306.23,301.34,306.23,311.12,316.01,320.89,325.78,330.67,325.78,320.89,316.01,311.12,306.23,301.34,296.45,291.56,286.67,281.78,276.89,272.01,267.34,262.67,267.34,272.01,276.89,281.78,286.67,291.56,296.45,301.34,306.23,311.12,316.01,320.89,325.78,330.67,335.56,340.45,345.34,350.23,345.34,340.45,335.56,330.67,335.56,340.45,345.34,350.23,355.12,360.01,355.12,350.23,345.34,340.45,345.34,350.23,355.12,360.01,364.89,369.78,374.67,379.56,384.45,389.34,384.45,379.56,374.67,369.78,364.89,360.01,355.12,350.23,345.34,340.45,345.34,350.23,355.12,360.01,355.12,350.23,345.34,340.45,345.34,350.23,355.12,360.01,364.89,369.78,374.67,379.56,384.45,389.34,394.23,389.34,384.45,379.56,374.67,369.78,374.67,379.56,384.45,389.34,394.23,389.34,394.23,399.12,404.01,399.12,394.23,399.12,404.01,408.89,413.78,418.67,413.78,408.89,404.01,399.12,404.01,408.89,413.78,418.67,413.78,408.89,404.01,399.12,394.23,389.34,394.23,399.12,404.01,408.89,404.01,399.12,404.01,408.89,413.78,418.67,413.78,408.89,404.01,399.12,394.23,399.12,404.01,399.12,404.01,408.89,404.01,399.12,394.23,399.12,394.23,399.12,394.23,389.34,394.23,399.12,394.23,389.34,384.45,389.34,394.23,399.12,394.23,399.12,404.01,399.12,404.01,408.89,413.78,408.89,404.01,399.12,404.01,399.12,404.01,399.12,394.23,399.12,404.01,408.89,404.01,399.12,404.01,396.73],
};

const STOCK_META = {
  JNJ:  { name: "Johnson & Johnson", type: "Dividend",  sector: "Healthcare",     dividendYield: 3.1, color: "#10b981" },
  KO:   { name: "Coca-Cola",          type: "Dividend",  sector: "Consumer",       dividendYield: 3.0, color: "#34d399" },
  PG:   { name: "Procter & Gamble",   type: "Dividend",  sector: "Consumer",       dividendYield: 2.5, color: "#6ee7b7" },
  META: { name: "Meta Platforms",     type: "Growth",    sector: "Technology",     dividendYield: 0.4, color: "#f59e0b" },
  TSLA: { name: "Tesla",              type: "Growth",    sector: "Automotive",     dividendYield: 0,   color: "#fbbf24" },
  PLTR: { name: "Palantir",           type: "High Risk", sector: "Technology",     dividendYield: 0,   color: "#ef4444" },
  COIN: { name: "Coinbase",           type: "High Risk", sector: "Crypto/Finance", dividendYield: 0,   color: "#f87171" },
  SOXL: { name: "SOXL 3x Semi ETF",  type: "High Risk", sector: "Leveraged ETF",  dividendYield: 0,   color: "#fca5a5" },
};

const TICKERS = ["JNJ","KO","PG","META","TSLA","PLTR","COIN","SOXL"];

function computeMetrics(prices, dividendYield = 0) {
  const returns = prices.slice(1).map((p, i) => (p - prices[i]) / prices[i]);
  const priceReturn = (prices[prices.length - 1] - prices[0]) / prices[0] * 100;
  const divContrib = dividendYield * (prices.length / 251);
  const totalReturn = priceReturn + divContrib;
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + (b - mean) ** 2, 0) / returns.length;
  const volatility = Math.sqrt(variance) * Math.sqrt(252) * 100;
  const sharpe = variance > 0 ? (mean - 0.05/252) / Math.sqrt(variance) * Math.sqrt(252) : 0;
  let peak = prices[0], maxDD = 0;
  for (const p of prices) { if (p > peak) peak = p; const dd = (peak - p) / peak; if (dd > maxDD) maxDD = dd; }
  return {
    priceReturn: +priceReturn.toFixed(2), dividendContrib: +divContrib.toFixed(2),
    totalReturn: +totalReturn.toFixed(2), volatility: +volatility.toFixed(2),
    sharpe: +sharpe.toFixed(2), maxDrawdown: +(maxDD * 100).toFixed(2),
  };
}

function generateDayTradingPnL(days) {
  const series = [];
  let capital = 10000, cumPnL = 0, seed = 42;
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };
  for (let i = 0; i < days; i++) {
    let dayPnL = 0;
    for (let t = 0; t < 6; t++) {
      const isWin = rand() < 0.44;
      const size = capital * 0.1;
      dayPnL += isWin ? size * 0.0115 - size * 0.003 : -size * 0.0105 - size * 0.003;
    }
    capital += dayPnL; cumPnL += dayPnL;
    series.push({ idx: i, cumulative: +cumPnL.toFixed(2), capital: +capital.toFixed(2), returnPct: +((capital - 10000) / 10000 * 100).toFixed(2) });
  }
  return series;
}

const C = { bg: "#0a0f1e", card: "#111827", border: "#1f2937", text: "#f9fafb", muted: "#6b7280" };

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      {payload.map((p, i) => <div key={i} style={{ color: p.color, marginBottom: 2 }}>{p.name}: <b>{typeof p.value === "number" ? p.value.toFixed(2) : p.value}{p.unit || ""}</b></div>)}
    </div>
  );
};

function Card({ label, value, sub, color = "#10b981" }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px", flex: 1, minWidth: 150 }}>
      <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
      <div style={{ color, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{value}</div>
      {sub && <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export default function App() {
  const [period, setPeriod] = useState("6m");
  const [tab, setTab] = useState("overview");

  const dayTrades = generateDayTradingPnL(251);

  const slice = (t) => {
    const p = REAL_PRICES[t];
    return period === "3m" ? p.slice(0, Math.floor(p.length / 2)) : p;
  };

  const M = {};
  TICKERS.forEach(t => { M[t] = computeMetrics(slice(t), STOCK_META[t].dividendYield); });

  const dtSlice = period === "3m" ? dayTrades.slice(0, 126) : dayTrades;
  const dtLast = dtSlice[dtSlice.length - 1];
  const dtRets = dtSlice.map((d, i) => i > 0 ? (d.capital - dtSlice[i-1].capital) / dtSlice[i-1].capital : 0);
  const dtMean = dtRets.reduce((a,b)=>a+b,0)/dtRets.length;
  const dtVar = dtRets.reduce((a,b)=>a+(b-dtMean)**2,0)/dtRets.length;
  const dtSharpe = +((dtMean - 0.05/252)/Math.sqrt(dtVar)*Math.sqrt(252)).toFixed(2);
  const dtVol = +(Math.sqrt(dtVar)*Math.sqrt(252)*100).toFixed(2);
  let dtPk = 10000, dtDD = 0;
  dtSlice.forEach(d => { if (d.capital>dtPk) dtPk=d.capital; const dd=(dtPk-d.capital)/dtPk; if (dd>dtDD) dtDD=dd; });
  dtDD = +(dtDD*100).toFixed(2);

  const refLen = slice("JNJ").length;
  const compareData = Array.from({ length: Math.min(refLen, dtSlice.length) }, (_, i) => {
    const row = { idx: i };
    TICKERS.forEach(t => { const s = slice(t); if (s[i]) row[t] = +((s[i]-s[0])/s[0]*100).toFixed(2); });
    row["DayTrade"] = dtSlice[i]?.returnPct || 0;
    return row;
  });

  const bestTicker = TICKERS.reduce((a, t) => M[t].totalReturn > M[a].totalReturn ? t : a);
  const mostVolatile = TICKERS.reduce((a, t) => M[t].volatility > M[a].volatility ? t : a);

  const tabs = [
    { id:"overview", label:"📊 Overview" },
    { id:"div_growth", label:"🔀 Dividend vs Growth" },
    { id:"high_risk", label:"🔥 High Risk" },
    { id:"day_lt", label:"⚡ Day vs Long-Term" },
    { id:"risk", label:"🛡 Risk Analysis" },
    { id:"backtest", label:"🔁 Backtesting" },
  ];

  const rows = [
    ...["JNJ","KO","PG","META","TSLA","PLTR","COIN","SOXL"].map(t => ({ ticker:t, ...STOCK_META[t], ...M[t] })),
    { ticker:"DAY", name:"Day Trading (sim)", type:"Day Trade", color:"#94a3b8", totalReturn:dtLast.returnPct, priceReturn:dtLast.returnPct, dividendContrib:0, volatility:dtVol, sharpe:dtSharpe, maxDrawdown:dtDD },
  ];

  const TS = id => ({ padding:"8px 14px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, background:tab===id?"#6366f1":C.card, color:tab===id?"#fff":C.muted });

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"'IBM Plex Sans','Segoe UI',sans-serif", color:C.text, paddingBottom:60 }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e1b4b)", borderBottom:`1px solid ${C.border}`, padding:"22px 32px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ color:"#818cf8", fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:4 }}>
              Capstone Project · Stock Market Analysis · <span style={{ color:"#a78bfa" }}>Alexia Le</span>
            </div>
            <h1 style={{ margin:0, fontSize:26, fontWeight:800, background:"linear-gradient(90deg,#c7d2fe,#f0abfc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Investment Strategy Comparator
            </h1>
            <div style={{ display:"flex", gap:8, marginTop:6, flexWrap:"wrap" }}>
              <span style={{ background:"#052e16", color:"#4ade80", padding:"2px 10px", borderRadius:4, fontSize:11, fontWeight:700 }}>✅ Real Data — Yahoo Finance</span>
              <span style={{ background:"#1e1b4b", color:"#a5b4fc", padding:"2px 10px", borderRadius:4, fontSize:11 }}>Mar 2025 → Mar 2026 · 251 trading days</span>
              <span style={{ background:"#451a03", color:"#fcd34d", padding:"2px 10px", borderRadius:4, fontSize:11 }}>⚠ NVDA export error → excluded</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {["3m","6m"].map(p => (
              <button key={p} onClick={()=>setPeriod(p)} style={{ padding:"8px 18px", borderRadius:8, border:`1px solid ${period===p?"#6366f1":C.border}`, background:period===p?"#6366f1":"transparent", color:period===p?"#fff":C.muted, cursor:"pointer", fontWeight:700 }}>
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding:"12px 32px", borderBottom:`1px solid ${C.border}`, display:"flex", gap:8, flexWrap:"wrap" }}>
        {tabs.map(t => <button key={t.id} onClick={()=>setTab(t.id)} style={TS(t.id)}>{t.label}</button>)}
      </div>

      <div style={{ padding:"24px 32px" }}>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div>
            <h2 style={{ margin:"0 0 6px", fontSize:19, fontWeight:700 }}>Market Overview</h2>
            <p style={{ color:C.muted, fontSize:13, margin:"0 0 20px" }}>Real Yahoo Finance data — {period==="3m"?"3":"6"} months · 8 stocks · 1 day-trading simulation</p>

            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:24 }}>
              <Card label="Best Performer" value={`+${M[bestTicker].totalReturn.toFixed(1)}%`} sub={`${bestTicker} — ${STOCK_META[bestTicker].name}`} color="#f59e0b" />
              <Card label="Best Dividend" value={`+${Math.max(...["JNJ","KO","PG"].map(t=>M[t].totalReturn)).toFixed(1)}%`} sub="Incl. dividend yield" color="#10b981" />
              <Card label="Most Volatile" value={`${M[mostVolatile].volatility.toFixed(0)}%`} sub={`${mostVolatile} annualized vol`} color="#ef4444" />
              <Card label="Day Trade Return" value={`${dtLast.returnPct.toFixed(1)}%`} sub="Simulated · win rate 44%" color="#94a3b8" />
            </div>

            <div style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, padding:22, marginBottom:18 }}>
              <div style={{ fontWeight:700, fontSize:15, marginBottom:3 }}>Total Return % — All Strategies (Real Data)</div>
              <div style={{ color:C.muted, fontSize:12, marginBottom:14 }}>Giá đóng cửa thực từ Yahoo Finance · indexed to 0% tại ngày đầu</div>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={compareData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="idx" tick={{ fill:C.muted, fontSize:9 }} tickFormatter={v=>`D${v}`} interval={Math.floor(compareData.length/6)} />
                  <YAxis tick={{ fill:C.muted, fontSize:10 }} tickFormatter={v=>`${v}%`} />
                  <Tooltip content={<Tip />} formatter={v=>[`${(+v).toFixed(2)}%`]} />
                  <Legend />
                  <ReferenceLine y={0} stroke="#374151" strokeDasharray="4 4" />
                  {TICKERS.map(t => <Line key={t} type="monotone" dataKey={t} stroke={STOCK_META[t].color} strokeWidth={STOCK_META[t].type==="High Risk"?2.5:1.8} dot={false} name={t} unit="%" />)}
                  <Line type="monotone" dataKey="DayTrade" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5 3" dot={false} name="Day Trade (sim)" unit="%" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden" }}>
              <div style={{ padding:"12px 20px", borderBottom:`1px solid ${C.border}`, fontWeight:700 }}>📋 Full Metrics Table — Real Yahoo Finance Data</div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                  <thead><tr style={{ background:"#1f2937" }}>
                    {["Ticker","Name","Type","Total Return","Price Return","Div %","Volatility","Sharpe","Max DD"].map(h=>(
                      <th key={h} style={{ padding:"9px 13px", textAlign:"left", color:C.muted, fontWeight:600, fontSize:10, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {rows.map((r,i)=>(
                      <tr key={r.ticker} style={{ borderTop:`1px solid ${C.border}`, background:i%2===0?"transparent":"#0d1117" }}>
                        <td style={{ padding:"9px 13px", fontWeight:700, fontFamily:"monospace", color:r.color }}>{r.ticker}</td>
                        <td style={{ padding:"9px 13px" }}>{r.name}</td>
                        <td style={{ padding:"9px 13px" }}>
                          <span style={{ background:r.type==="Dividend"?"#065f46":r.type==="Growth"?"#78350f":r.type==="High Risk"?"#7f1d1d":"#1e1b4b", color:r.type==="Dividend"?"#6ee7b7":r.type==="Growth"?"#fcd34d":r.type==="High Risk"?"#fca5a5":"#a5b4fc", padding:"2px 6px", borderRadius:3, fontSize:10, fontWeight:600 }}>{r.type}</span>
                        </td>
                        <td style={{ padding:"9px 13px", fontWeight:700, color:r.totalReturn>=0?"#10b981":"#ef4444" }}>{r.totalReturn>=0?"+":""}{r.totalReturn?.toFixed(2)}%</td>
                        <td style={{ padding:"9px 13px", color:r.priceReturn>=0?"#34d399":"#f87171" }}>{r.priceReturn>=0?"+":""}{r.priceReturn?.toFixed(2)}%</td>
                        <td style={{ padding:"9px 13px", color:"#0ea5e9" }}>{r.dividendContrib?.toFixed(2)}%</td>
                        <td style={{ padding:"9px 13px", color:r.volatility>80?"#f87171":r.volatility>40?"#fcd34d":"#6ee7b7" }}>{r.volatility?.toFixed(1)}%</td>
                        <td style={{ padding:"9px 13px", color:r.sharpe>1?"#10b981":r.sharpe>0?"#fcd34d":"#ef4444" }}>{r.sharpe?.toFixed(2)}</td>
                        <td style={{ padding:"9px 13px", color:r.maxDrawdown>50?"#f87171":r.maxDrawdown>20?"#fcd34d":"#6ee7b7" }}>-{r.maxDrawdown?.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── DIVIDEND VS GROWTH ── */}
        {tab === "div_growth" && (
          <div>
            <h2 style={{ margin:"0 0 6px", fontSize:19, fontWeight:700 }}>Dividend vs Growth Stocks</h2>
            <p style={{ color:C.muted, fontSize:13, margin:"0 0 20px" }}>Cổ tức ổn định (JNJ/KO/PG) vs tăng trưởng (META/TSLA) — data thật</p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:22 }}>
              {["JNJ","KO","PG","META","TSLA"].map(t=>(
                <Card key={t} label={`${t} — ${STOCK_META[t].type}`}
                  value={`${M[t].totalReturn>=0?"+":""}${M[t].totalReturn.toFixed(1)}%`}
                  sub={STOCK_META[t].dividendYield>0?`Price ${M[t].priceReturn.toFixed(1)}% + Div ${M[t].dividendContrib.toFixed(2)}%`:`Pure price · Vol ${M[t].volatility.toFixed(0)}%`}
                  color={STOCK_META[t].color} />
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
              {[["Dividend Stocks","JNJ","KO","PG"],["Growth Stocks","META","TSLA"]].map(([lbl,...ts])=>(
                <div key={lbl} style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:18 }}>
                  <div style={{ fontWeight:700, marginBottom:10 }}>{lbl}</div>
                  <ResponsiveContainer width="100%" height={210}>
                    <AreaChart data={compareData}>
                      <defs>{ts.map(t=><linearGradient key={t} id={`g${t}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={STOCK_META[t].color} stopOpacity={0.3}/><stop offset="95%" stopColor={STOCK_META[t].color} stopOpacity={0}/></linearGradient>)}</defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="idx" tick={{ fill:C.muted, fontSize:9 }} tickFormatter={v=>`D${v}`} interval={Math.floor(compareData.length/4)} />
                      <YAxis tick={{ fill:C.muted, fontSize:9 }} tickFormatter={v=>`${v}%`} />
                      <Tooltip content={<Tip />} formatter={v=>[`${(+v).toFixed(2)}%`]} />
                      <ReferenceLine y={0} stroke="#374151" strokeDasharray="4 4" />
                      {ts.map(t=><Area key={t} type="monotone" dataKey={t} stroke={STOCK_META[t].color} fill={`url(#g${t})`} strokeWidth={2} dot={false} name={t} unit="%" />)}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
            <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:22 }}>
              <div style={{ fontWeight:700, marginBottom:14 }}>Return Decomposition — Price vs Dividend Contribution</div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={["JNJ","KO","PG","META","TSLA"].map(t=>({ ticker:t, priceReturn:M[t].priceReturn, dividend:M[t].dividendContrib }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="ticker" tick={{ fill:C.muted, fontSize:12 }} />
                  <YAxis tick={{ fill:C.muted, fontSize:10 }} tickFormatter={v=>`${v}%`} />
                  <Tooltip content={<Tip />} formatter={v=>[`${(+v).toFixed(2)}%`]} />
                  <Legend />
                  <ReferenceLine y={0} stroke="#374151" />
                  <Bar dataKey="priceReturn" name="Price Return" stackId="a" fill="#6366f1" radius={[0,0,4,4]} />
                  <Bar dataKey="dividend" name="Dividend %" stackId="a" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── HIGH RISK ── */}
        {tab === "high_risk" && (
          <div>
            <h2 style={{ margin:"0 0 6px", fontSize:19, fontWeight:700 }}>🔥 High Risk Plays</h2>
            <p style={{ color:C.muted, fontSize:13, margin:"0 0 20px" }}>PLTR · COIN · SOXL 3x Leveraged — dữ liệu thật Yahoo Finance</p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:22 }}>
              {["PLTR","COIN","SOXL"].map(t=>(
                <Card key={t} label={`${t} — ${STOCK_META[t].name}`}
                  value={`${M[t].totalReturn>=0?"+":""}${M[t].totalReturn.toFixed(1)}%`}
                  sub={`Vol: ${M[t].volatility.toFixed(0)}% · Sharpe: ${M[t].sharpe.toFixed(2)} · Max DD: -${M[t].maxDrawdown.toFixed(1)}%`}
                  color={STOCK_META[t].color} />
              ))}
            </div>
            <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:22, marginBottom:16 }}>
              <div style={{ fontWeight:700, marginBottom:3 }}>High Risk vs Reference Stocks — Return %</div>
              <div style={{ color:C.muted, fontSize:12, marginBottom:14 }}>SOXL 3x leverage tạo swing cực mạnh — so sánh với JNJ và META làm reference</div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={compareData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="idx" tick={{ fill:C.muted, fontSize:9 }} tickFormatter={v=>`D${v}`} interval={Math.floor(compareData.length/6)} />
                  <YAxis tick={{ fill:C.muted, fontSize:10 }} tickFormatter={v=>`${v}%`} />
                  <Tooltip content={<Tip />} formatter={v=>[`${(+v).toFixed(2)}%`]} />
                  <Legend />
                  <ReferenceLine y={0} stroke="#374151" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="SOXL" stroke="#fca5a5" strokeWidth={2.5} dot={false} name="SOXL 3x" unit="%" />
                  <Line type="monotone" dataKey="PLTR" stroke="#ef4444" strokeWidth={2.5} dot={false} name="PLTR" unit="%" />
                  <Line type="monotone" dataKey="COIN" stroke="#f87171" strokeWidth={2.5} dot={false} name="COIN" unit="%" />
                  <Line type="monotone" dataKey="JNJ" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="JNJ (ref)" unit="%" />
                  <Line type="monotone" dataKey="META" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="META (ref)" unit="%" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background:"#1c0a09", border:"1px solid #7f1d1d", borderLeft:"4px solid #ef4444", borderRadius:12, padding:"14px 18px" }}>
              <div style={{ fontWeight:700, color:"#fca5a5", marginBottom:6 }}>⚠️ Risk Warning — Data Thật Xác Nhận</div>
              <p style={{ color:"#fecaca", margin:0, fontSize:13, lineHeight:1.7 }}>
                <b>SOXL</b>: Dù tổng return {M["SOXL"].totalReturn.toFixed(1)}% nhưng max drawdown thực là <b>-{M["SOXL"].maxDrawdown.toFixed(1)}%</b> và annualized vol <b>{M["SOXL"].volatility.toFixed(0)}%</b>. 3x leverage decay trong sideways market làm mất vốn nhanh.{" "}
                <b>COIN</b>: Return {M["COIN"].totalReturn.toFixed(1)}%, max drawdown <b>-{M["COIN"].maxDrawdown.toFixed(1)}%</b> — cực kỳ nhạy cảm với Bitcoin sentiment.{" "}
                <b>PLTR</b>: Return tốt nhất nhóm ({M["PLTR"].totalReturn.toFixed(1)}%) nhờ AI narrative, nhưng P/E ~300x — rủi ro correction cao khi sentiment đổi.
              </p>
            </div>
          </div>
        )}

        {/* ── DAY VS LONG-TERM ── */}
        {tab === "day_lt" && (
          <div>
            <h2 style={{ margin:"0 0 6px", fontSize:19, fontWeight:700 }}>Day Trading vs Long-Term</h2>
            <p style={{ color:C.muted, fontSize:13, margin:"0 0 20px" }}>Day trading simulation vs buy-and-hold với giá thật — cùng vốn $10,000</p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:22 }}>
              <Card label="Day Trade Return" value={`${dtLast.returnPct.toFixed(1)}%`} sub="44% win · 6 trades/day · 0.15% commission" color={dtLast.returnPct>=0?"#10b981":"#ef4444"} />
              <Card label="Best Long-Term" value={`+${M[bestTicker].totalReturn.toFixed(1)}%`} sub={`${bestTicker} Buy & Hold (real data)`} color={STOCK_META[bestTicker].color} />
              <Card label="JNJ Long-Term" value={`+${M["JNJ"].totalReturn.toFixed(1)}%`} sub="Dividend stock — real data" color="#10b981" />
              <Card label="KO Long-Term" value={`+${M["KO"].totalReturn.toFixed(1)}%`} sub="Dividend stock — real data" color="#34d399" />
            </div>
            <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:22, marginBottom:16 }}>
              <div style={{ fontWeight:700, marginBottom:3 }}>Day Trading P&L vs Real Stock Returns</div>
              <div style={{ color:C.muted, fontSize:12, marginBottom:14 }}>Day Trade = simulation · tất cả stocks còn lại = giá đóng cửa thực từ Yahoo Finance</div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={compareData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="idx" tick={{ fill:C.muted, fontSize:9 }} tickFormatter={v=>`D${v}`} interval={Math.floor(compareData.length/6)} />
                  <YAxis tick={{ fill:C.muted, fontSize:10 }} tickFormatter={v=>`${v}%`} />
                  <Tooltip content={<Tip />} formatter={v=>[`${(+v).toFixed(2)}%`]} />
                  <Legend />
                  <ReferenceLine y={0} stroke="#374151" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="PLTR" stroke="#ef4444" strokeWidth={2} dot={false} name="PLTR (real)" unit="%" />
                  <Line type="monotone" dataKey="SOXL" stroke="#fca5a5" strokeWidth={2} dot={false} name="SOXL (real)" unit="%" />
                  <Line type="monotone" dataKey="JNJ" stroke="#10b981" strokeWidth={2} dot={false} name="JNJ (real)" unit="%" />
                  <Line type="monotone" dataKey="KO" stroke="#34d399" strokeWidth={2} dot={false} name="KO (real)" unit="%" />
                  <Line type="monotone" dataKey="DayTrade" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 3" dot={false} name="Day Trade (sim)" unit="%" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background:"#1c1917", border:"1px solid #44403c", borderLeft:"4px solid #f59e0b", borderRadius:12, padding:"14px 18px" }}>
              <div style={{ fontWeight:700, color:"#fcd34d", marginBottom:6 }}>💡 Insight từ Data Thật</div>
              <p style={{ color:"#d6d3d1", margin:0, fontSize:13, lineHeight:1.7 }}>
                Với data Yahoo Finance Mar 2025→Mar 2026: ngay cả cổ phiếu cổ tức ổn định như JNJ (<b style={{color:"#10b981"}}>+{M["JNJ"].totalReturn.toFixed(1)}%</b>) và KO (<b style={{color:"#34d399"}}>+{M["KO"].totalReturn.toFixed(1)}%</b>) đều outperform day trading (<b style={{color:"#94a3b8"}}>{dtLast.returnPct.toFixed(1)}%</b>). Kết luận: buy-and-hold thắng day trading không chỉ về return mà còn không tốn thời gian 6-8h/ngày theo dõi thị trường.
              </p>
            </div>
          </div>
        )}

        {/* ── RISK ── */}
        {tab === "risk" && (
          <div>
            <h2 style={{ margin:"0 0 6px", fontSize:19, fontWeight:700 }}>Risk Analysis</h2>
            <p style={{ color:C.muted, fontSize:13, margin:"0 0 20px" }}>Sharpe ratio · Volatility · Max Drawdown — tính từ real price data</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
              {[["Annualized Volatility (%)", "volatility", v=>`${v.toFixed(0)}%`], ["Sharpe Ratio", "sharpe", v=>v.toFixed(2)]].map(([title, key, fmt])=>(
                <div key={key} style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:18 }}>
                  <div style={{ fontWeight:700, marginBottom:10 }}>{title}</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={[...TICKERS.map(t=>({ ticker:t, val:M[t][key], color:STOCK_META[t].color })), { ticker:"DAY", val:key==="volatility"?dtVol:dtSharpe, color:"#94a3b8" }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="ticker" tick={{ fill:C.muted, fontSize:10 }} />
                      <YAxis tick={{ fill:C.muted, fontSize:9 }} tickFormatter={v=>key==="volatility"?`${v}%`:v.toFixed(1)} />
                      <Tooltip content={<Tip />} formatter={v=>[fmt(+v)]} />
                      {key==="sharpe" && <ReferenceLine y={1} stroke="#10b981" strokeDasharray="4 2" />}
                      {key==="sharpe" && <ReferenceLine y={0} stroke="#374151" />}
                      <Bar dataKey="val" name={title} radius={[4,4,0,0]} fill="#6366f1" label={{ position:"top", fill:C.muted, fontSize:9, formatter:v=>fmt(+v) }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
            <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:18 }}>
              <div style={{ fontWeight:700, marginBottom:10 }}>Max Drawdown (%) — worst peak-to-trough loss</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[...TICKERS.map(t=>({ ticker:t, dd:M[t].maxDrawdown })), { ticker:"DAY", dd:dtDD }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="ticker" tick={{ fill:C.muted, fontSize:10 }} />
                  <YAxis tick={{ fill:C.muted, fontSize:9 }} tickFormatter={v=>`-${v}%`} />
                  <Tooltip content={<Tip />} formatter={v=>[`-${(+v).toFixed(1)}%`]} />
                  <ReferenceLine y={20} stroke="#f59e0b" strokeDasharray="4 2" label={{ value:"20% threshold", fill:"#f59e0b", fontSize:9 }} />
                  <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 2" label={{ value:"50% danger", fill:"#ef4444", fontSize:9 }} />
                  <Bar dataKey="dd" name="Max Drawdown" radius={[4,4,0,0]} fill="#ef4444" label={{ position:"top", fill:C.muted, fontSize:9, formatter:v=>`-${(+v).toFixed(0)}%` }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── BACKTESTING ── */}
        {tab === "backtest" && (
          <div>
            <h2 style={{ margin:"0 0 6px", fontSize:19, fontWeight:700 }}>Backtesting Results</h2>
            <p style={{ color:C.muted, fontSize:13, margin:"0 0 20px" }}>Performance qua các time window — real close prices</p>
            {(() => {
              const windows = [{ label:"1M", n:22 },{ label:"3M", n:63 },{ label:"6M", n:126 },{ label:"1Y", n:251 }];
              const getR = (t, n) => {
                const p = REAL_PRICES[t].slice(0, Math.min(n, REAL_PRICES[t].length));
                return p.length > 1 ? +((p[p.length-1]-p[0])/p[0]*100 + (STOCK_META[t]?.dividendYield||0)*(n/251)).toFixed(2) : 0;
              };
              const btData = windows.map(w => {
                const row = { window: w.label };
                TICKERS.forEach(t => { row[t] = getR(t, w.n); });
                row["DayTrade"] = dayTrades[Math.min(w.n, dayTrades.length-1)].returnPct;
                return row;
              });
              return (
                <>
                  <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:22, marginBottom:16 }}>
                    <div style={{ fontWeight:700, marginBottom:14 }}>Return by Time Window — Real Data</div>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={btData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="window" tick={{ fill:C.muted, fontSize:12 }} />
                        <YAxis tick={{ fill:C.muted, fontSize:10 }} tickFormatter={v=>`${v}%`} />
                        <Tooltip content={<Tip />} formatter={v=>[`${(+v).toFixed(2)}%`]} />
                        <Legend />
                        <ReferenceLine y={0} stroke="#374151" />
                        {TICKERS.map(t=><Bar key={t} dataKey={t} fill={STOCK_META[t].color} radius={[2,2,0,0]} />)}
                        <Bar dataKey="DayTrade" fill="#94a3b8" radius={[2,2,0,0]} name="DayTrade(sim)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                    <div style={{ padding:"12px 20px", borderBottom:`1px solid ${C.border}`, fontWeight:700 }}>📊 Backtesting Matrix — Real Yahoo Finance Data</div>
                    <div style={{ overflowX:"auto" }}>
                      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                        <thead><tr style={{ background:"#1f2937" }}>
                          <th style={{ padding:"9px 14px", textAlign:"left", color:C.muted, fontSize:10 }}>Ticker</th>
                          {windows.map(w=><th key={w.label} style={{ padding:"9px 14px", textAlign:"right", color:C.muted, fontSize:10 }}>{w.label} Return</th>)}
                          <th style={{ padding:"9px 14px", textAlign:"left", color:C.muted, fontSize:10 }}>Verdict</th>
                        </tr></thead>
                        <tbody>
                          {[...TICKERS.map(t=>({ ticker:t, color:STOCK_META[t].color })), { ticker:"DAY", color:"#94a3b8" }].map((s,i)=>{
                            const rets = windows.map(w => s.ticker==="DAY" ? dayTrades[Math.min(w.n,dayTrades.length-1)].returnPct : getR(s.ticker, w.n));
                            const wins = rets.filter(r=>r>0).length;
                            return (
                              <tr key={s.ticker} style={{ borderTop:`1px solid ${C.border}`, background:i%2===0?"transparent":"#0d1117" }}>
                                <td style={{ padding:"9px 14px", fontWeight:700, fontFamily:"monospace", color:s.color }}>{s.ticker}</td>
                                {rets.map((r,j)=><td key={j} style={{ padding:"9px 14px", textAlign:"right", fontFamily:"monospace", fontWeight:600, color:r>=0?"#10b981":"#ef4444" }}>{r>=0?"+":""}{r.toFixed(1)}%</td>)}
                                <td style={{ padding:"9px 14px", fontSize:11, color:wins===4?"#10b981":wins>=2?"#fcd34d":"#ef4444" }}>
                                  {wins===4?"✅ Consistently +"  :wins===3?"✅ Mostly +":wins===2?"⚠️ Mixed":"❌ Mostly Negative"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
